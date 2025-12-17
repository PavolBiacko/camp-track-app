DECLARE
    v_current_session_id integer;
    v_group_id integer;
    v_today date := CURRENT_DATE; -- Použitie CURRENT_DATE
BEGIN
    -- 1. Nájsť ID aktuálneho táborového turnusu na základe dnešného dátumu
    SELECT id
    INTO v_current_session_id
    FROM camp_sessions
    WHERE begin_date <= v_today
      AND end_date >= v_today
    LIMIT 1;

    -- Ak neexistuje aktívny turnus, vrátiť NULL
    IF v_current_session_id IS NULL THEN
        RAISE EXCEPTION 'Nenašiel sa žiadny aktívny táborový turnus pre dnešný dátum (%).', v_today;
    END IF;

    -- 2. Nájsť ID skupiny na základe leader_id a nájdeného session_id
    SELECT id
    INTO v_group_id
    FROM groups
    WHERE leader_id = p_leader_id
      AND session_id = v_current_session_id;

    -- Ak vedúci nie je priradený k skupine v tomto turnuse, vrátiť NULL
    IF v_group_id IS NULL THEN
        RAISE EXCEPTION 'Vedúci s ID % nemá priradenú skupinu pre aktuálny turnus (ID: %).', p_leader_id, v_current_session_id;
    END IF;

    RETURN v_group_id;

END;