DO $ $ BEGIN IF NOT EXISTS (
    SELECT
        *
    FROM
        pg_type typ
        INNER JOIN pg_namespace nsp ON nsp.oid = typ.typnamespace
    WHERE
        nsp.nspname = current_schema()
        AND typ.typname = 'account_type'
) THEN CREATE TYPE ACCOUNT_TYPE AS ENUM ('Checking', 'Savings');

END IF;

END;

$ $ LANGUAGE plpgsql;

DO $ $ BEGIN IF NOT EXISTS (
    SELECT
        *
    FROM
        pg_type typ
        INNER JOIN pg_namespace nsp ON nsp.oid = typ.typnamespace
    WHERE
        nsp.nspname = current_schema()
        AND typ.typname = 'transaction_type'
) THEN CREATE TYPE TRANSACTION_TYPE AS ENUM ('Withdraw', 'Deposit');

END IF;

END;

$ $ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION accountUUID () RETURNS char(9) as $ uuid $ declare uuid char(9);

found boolean = true;

BEGIN LOOP EXIT
WHEN found = false;

SELECT
    array_to_string(
        ARRAY(
            SELECT
                chr((48 + round(random() * 10)) :: integer) INTO uuid
            FROM
                generate_series(1, 9)
        ),
        ''
    );

SELECT
    EXISTS(
        SELECT
            1
        FROM
            Accounts
        WHERE
            AccountNumber = uuid
        LIMIT
            1
    ) INTO found;

END LOOP;

RETURN uuid;

END;

$ uuid $ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS Accounts (
    AccountNumber CHAR(9) DEFAULT accountUUID(),
    CognitoSub CHAR(36) NOT NULL,
    AccountType ACCOUNT_TYPE NOT NULL,
    CurrentBalance MONEY DEFAULT 0,
    Created TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT account_pk PRIMARY KEY (AccountNumber)
);

CREATE TABLE IF NOT EXISTS Transactions (
    AccountNumber CHAR(9) NOT NULL,
    TransactionNumber BIGSERIAL NOT NULL,
    TransactionType TRANSACTION_TYPE NOT NULL,
    TransactionAmount MONEY DEFAULT 0,
    CONSTRAINT transaction_pk PRIMARY KEY (AccountNumber, TransactionNumber),
    CONSTRAINT transaction_account_fk FOREIGN KEY (AccountNumber) REFERENCES Accounts(AccountNumber)
);