DECLARE
    v_group_id integer;
    v_new_balance numeric;
    v_current_balance numeric;
    v_record public.cash_register_record;
BEGIN
    -- 1. Získanie kontextu skupiny
    -- Ak zlyhá, automaticky sa spustí EXCEPTION a ROLLBACK celej operácie.
    SELECT public.get_current_group_id_by_leader_id(input.leader_id)
    INTO v_group_id;

    -- 2. Aktualizácia Zostatku Účtu (iba ak je child_id definované)
    IF input.child_id IS NOT NULL THEN
        -- Získanie aktuálneho zostatku a zamknutie riadku (FOR UPDATE)
        SELECT account_balance
        INTO v_current_balance
        FROM group_accounts
        WHERE child_id = input.child_id
          AND group_id = v_group_id
        FOR UPDATE; 

        IF v_current_balance IS NULL THEN
            RAISE EXCEPTION 'Účet dieťaťa % nebol nájdený v skupine %.', input.child_id, v_group_id;
        END IF;

        -- Výpočet nového zostatku: Predpokladáme, že 'transaction_amount'
        -- už má správne znamienko (+ pre DEPOSIT, - pre WITHDRAWAL/PURCHASE)
        v_new_balance := v_current_balance + input.transaction_amount;

        -- Aktualizácia zostatku
        UPDATE group_accounts
        SET account_balance = v_new_balance
        WHERE child_id = input.child_id
          AND group_id = v_group_id;
    END IF;

    -- 3. Vytvorenie Transakcie
    -- Vytvorí sa buď s child_id (pre dieťa) alebo s NULL (pre Vyrovnanie bufetu).
    INSERT INTO transactions (group_id, child_id, amount, type)
    VALUES (v_group_id, input.child_id, input.transaction_amount, input.transaction_type);

    -- 4. Atomická Aktualizácia Hotovostného Registra
    -- Prechádzame pole s NOVÝMI cieľovými kvantitami a prepisujeme register.
    FOREACH v_record IN ARRAY input.denominations_updates
    LOOP
        -- Aktualizujeme riadok s novou KVANTOU
        UPDATE cash_register
        SET quantity = v_record.quantity
        WHERE group_id = v_group_id
          AND denomination = v_record.denomination;

        -- Kontrola, či riadok existoval a bol aktualizovaný. Ak nie, register je nekonzistentný/neinicializovaný.
        IF NOT FOUND THEN
             RAISE EXCEPTION 'Chyba integrity: nenašiel sa riadok pre denomináciu % v cash_register pre skupinu %.', v_record.denomination, v_group_id;
        END IF;
    END LOOP;

    -- 5. Návrat úspechu
    RETURN json_build_object(
        'status', 'success',
        'message', 'Finančná akcia spracovaná atomicky.',
        'transaction_type', input.transaction_type
    );

EXCEPTION
    -- Ak nastane akákoľvek chyba (v RLS, Riadok nebol nájdený, chýbajúci zostatok),
    -- spustí sa ROLLBACK a žiadna zmena (2, 3, 4) nebude trvalá.
    WHEN OTHERS THEN
        -- Vrátenie detailov chyby pre klienta
        RETURN json_build_object(
            'status', 'error',
            'message', 'Chyba spracovania transakcie: ' || SQLERRM,
            'detail', 'Celá operácia bola vrátená (ROLLBACK).'
        );
END;