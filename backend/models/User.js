/**
 * Model utilizator
 * TODO: Implementare cu queries PostgreSQL
 */

export class User {
    constructor(id, email, password, plan = 'free', creditsRemaining = 3) {
        this.id = id;
        this.email = email;
        this.password = password; // hashed
        this.plan = plan; // 'free', 'pro', 'enterprise'
        this.creditsRemaining = creditsRemaining;
        this.createdAt = new Date();
    }

    static async create(email, hashedPassword) {
        // TODO: INSERT INTO users
    }

    static async findByEmail(email) {
        // TODO: SELECT * FROM users WHERE email = $1
    }

    static async updateCredits(userId, credits) {
        // TODO: UPDATE users SET creditsRemaining = creditsRemaining - $1
    }
}
