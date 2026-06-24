-- Creare bază de date și tabele principale

-- Tabela utilizatori
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    plan VARCHAR(50) DEFAULT 'free', -- 'free', 'pro', 'enterprise'
    credits_remaining INT DEFAULT 3,
    subscription_id VARCHAR(255), -- Stripe subscription ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela generări (istoricul)
CREATE TABLE IF NOT EXISTS generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL, -- 'image', 'text'
    prompt TEXT NOT NULL,
    result_url TEXT, -- URL imagine sau text generat
    cost INT DEFAULT 1, -- credite folosite
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela plăți (transacții)
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_payment_id VARCHAR(255) NOT NULL UNIQUE,
    amount INT NOT NULL, -- în cenți
    plan VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indecși pentru performanță
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_generations_user_id ON generations(user_id);
CREATE INDEX idx_generations_created_at ON generations(created_at);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_stripe_id ON payments(stripe_payment_id);
