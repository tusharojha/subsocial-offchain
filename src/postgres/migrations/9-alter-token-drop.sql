ALTER TABLE df.token_drops ADD column date TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE df.token_drops DROP CONSTRAINT token_drops_pkey;
ALTER TABLE df.token_drops ADD PRIMARY KEY (block_number, event_index);
