DECLARE
    v_group_id integer;
    v_payment_record public.buffet_payment_detail;
    v_current_balance numeric;
    v_new_balance numeric;
    v_transaction_type public.transaction_type := 'PURCHASE';
BEGIN
    -- 1. Atomické získanie kontextu skupiny
    -- Ak get_current_group_id_by_leader_id zlyhá, spúšťa sa implicitne ROLLBACK.
    SELECT public.get_current_group_id_by_leader_id(input.leader_id)
    INTO v_group_id;

    -- 2. Iterácia cez všetky platby a atomické spracovanie
    FOREACH v_payment_record IN ARRAY input.payments_list
    LOOP
        -- A. Získanie aktuálneho zostatku a zamknutie riadku (FOR UPDATE)
        SELECT account_balance
        INTO v_current_balance
        FROM group_accounts
        WHERE child_id = v_payment_record.child_id
          AND group_id = v_group_id
        FOR UPDATE; -- Zabraňuje súbežnej zmene

        -- Kontrola integrity: Účet dieťaťa musí existovať!
        IF v_current_balance IS NULL THEN
            -- Ak účet nebol nájdený, vyvoláme výnimku, ktorá spustí ROLLBACK celého bloku.
            RAISE EXCEPTION 'Účet dieťaťa s ID % nebol nájdený v skupine %. Rollback celej dávky.', v_payment_record.child_id, v_group_id;
        END IF;

        -- B. Výpočet nového zostatku (ODPOČET sumy)
        -- Predpokladáme, že amount je KLADNÉ číslo, preto odčítame.
        v_new_balance := v_current_balance - v_payment_record.amount;

        -- C. Vytvorenie transakcie (amount je negatívne, pretože je to odpis)
        INSERT INTO transactions (group_id, child_id, amount, type)
        VALUES (v_group_id, v_payment_record.child_id, v_payment_record.amount * -1, v_transaction_type);

        -- D. Aktualizácia zostatku účtu
        UPDATE group_accounts
        SET account_balance = v_new_balance
        WHERE child_id = v_payment_record.child_id
          AND group_id = v_group_id;

    END LOOP;

    -- 3. Ak cyklus prebehol bez chyby, vykoná sa COMMIT.
    RETURN json_build_object(
        'status', 'success',
        'message', 'Hromadná platba z bufetu bola atomicky spracovaná.',
        'group_id', v_group_id
    );

EXCEPTION
    -- Ak nastane akákoľvek chyba v bloku (napr. RAISE EXCEPTION), vykoná sa ROLLBACK.
    WHEN OTHERS THEN
        RETURN json_build_object(
            'status', 'error',
            'message', 'Chyba pri hromadnej platbe: ' || SQLERRM,
            'detail', 'Celá dávková transakcia bola vrátená (ROLLBACK). Žiadne zostatky neboli zmenené.'
        );
END;
