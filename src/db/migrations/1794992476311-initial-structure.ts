import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialStructure1794992476311 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `create table clubs (
                id uuid primary key default uuidv7 (),
                name varchar not null,
                created_at timestamptz not null default now(),
                updated_at timestamptz not null default now()
            );`
        );

        await queryRunner.query(
            `create table users (
                id uuid primary key default uuidv7 (),
                name varchar not null,
                email varchar UNIQUE not null,
                password_hash varchar not null,
                created_at timestamptz not null default now(),
                updated_at timestamptz not null default now()
            );`
        );

        await queryRunner.query(
            `create table races (
                id uuid primary key default uuidv7 (),
                name varchar not null,
                entry_fee decimal(10,2) not null,
                starts_at timestamptz not null,
                capacity integer not null,
                slots_taken integer not null default 0,
                club_id uuid not null references clubs (id),
                created_at timestamptz not null default now(),
                updated_at timestamptz not null default now()
            );`
        );

        await queryRunner.query(
            `create table registrations (
                id uuid primary key default uuidv7 (),
                race_id uuid not null references races(id),
                user_id uuid not null references users(id),
                created_at timestamptz not null default now(),
                updated_at timestamptz not null default now()
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
