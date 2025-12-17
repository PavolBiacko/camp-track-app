DECLARE
    v_group_id integer;
    v_child_record RECORD;
BEGIN
    -- 1. Získanie ID skupiny na základe vedúceho
    SELECT public.get_current_group_id_by_leader_id(input.leader_id)
    INTO v_group_id;

    -- 2. Vynulovanie účtov detí
    -- Prechádzame všetky deti v danom oddiele, ktoré majú zostatok > 0
    FOR v_child_record IN (
        SELECT child_id, account_balance 
        FROM public.group_accounts 
        WHERE group_id = v_group_id AND account_balance > 0
    )
    LOOP
        -- Nastavíme zostatok na nulu
        UPDATE public.group_accounts
        SET account_balance = 0.00
        WHERE child_id = v_child_record.child_id AND group_id = v_group_id;
    END LOOP;

    -- 3. Vynulovanie hotovostného registra (všetky denominácie na 0)
    UPDATE public.cash_register
    SET quantity = 0
    WHERE group_id = v_group_id;

    -- 4. Voliteľné: Zápis jednej sumárnej transakcie (ak child_id môže byť NULL)
    -- Táto transakcia reprezentuje celkový odliv peňazí z oddielu
    INSERT INTO public.transactions (group_id, child_id, amount, type)
    VALUES (v_group_id, NULL, input.total_amount * -1, 'WITHDRAWAL');

    RETURN json_build_object(
        'status', 'success',
        'message', 'Všetky účty a hotovosť boli vynulované.',
        'total_paid_out', input.total_amount
    );

EXCEPTION WHEN OTHERS THEN
    -- Akékoľvek zlyhanie (napr. chyba pri zápise) vráti všetko späť
    RETURN json_build_object(
        'status', 'error',
        'message', 'Chyba pri hromadnom vynulovaní: ' || SQLERRM
    );
END;