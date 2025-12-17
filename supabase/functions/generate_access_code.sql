DECLARE
  characters TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- 29 characters
  base INT := LENGTH(characters); -- 29
  code_length INT := 8;
  uuid_text TEXT := uuid_input::TEXT; -- Convert UUID to text
  uuid_clean TEXT := REPLACE(uuid_text, '-', ''); -- Remove hyphens (32 chars)
  code TEXT := '';
  group_size INT := 4;
  i INT;
  j INT;
  sum INT;
  char_code INT;
  idx INT;
BEGIN
  -- Generate 8 characters for the access code
  FOR i IN 0..(code_length - 1) LOOP
    sum := 0;
    -- Process a group of 4 characters starting at position (i * 2) to spread across the UUID
    FOR j IN 1..group_size LOOP
      -- Calculate the position in the cleaned UUID (32 chars), looping if necessary
      idx := (i * 2 + j - 1) % 32 + 1;
      char_code := ASCII(SUBSTRING(uuid_clean FROM idx FOR 1));
      -- Add the character code multiplied by its position (1 to 4)
      sum := sum + (char_code * j);
    END LOOP;
    -- Map the sum to a character in our set
    idx := (sum % base) + 1; -- 1-based index for SUBSTRING
    code := code || SUBSTRING(characters FROM idx FOR 1);
  END LOOP;

  RETURN code;
END;
