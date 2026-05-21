/**
 * SRS (Spaced Repetition System) - Algoritmo SM-2
 * Baseado no algoritmo SuperMemo 2, usado por Anki e outros sistemas de flashcards
 * 
 * O algoritmo calcula o próximo intervalo de revisão baseado na:
 * - Qualidade da resposta (0-5)
 * - Facilidade atual (ease factor)
 * - Intervalo anterior
 * - Número de repetições
 */

class SRSAlgorithm {
    /**
     * Calcula o próximo intervalo de revisão usando SM-2
     * @param {Object} card - Cartão atual com ease_factor, interval, repetitions
     * @param {number} quality - Qualidade da resposta (0-5)
     * 0 = completo esquecimento
     * 1 = resposta incorreta mas familiar
     * 2 = resposta incorreta mas fácil de lembrar
     * 3 = resposta correta com dificuldade
     * 4 = resposta correta com hesitação
     * 5 = resposta perfeita
     * @returns {Object} - Novo estado do cartão
     */
    static calculateNextReview(card, quality) {
        let { ease_factor, interval, repetitions } = card;
        
        // Se qualidade < 3, reiniciar as repetições
        if (quality < 3) {
            repetitions = 0;
            interval = 1;
        } else {
            // Se qualidade >= 3, incrementar repetições
            if (repetitions === 0) {
                interval = 1;
            } else if (repetitions === 1) {
                interval = 6;
            } else {
                interval = Math.round(interval * ease_factor);
            }
            repetitions++;
        }

        // Calcular novo ease factor
        // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
        ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        
        // Limitar ease factor entre 1.3 e 2.5
        ease_factor = Math.max(1.3, Math.min(2.5, ease_factor));

        // Calcular próxima data de revisão
        const next_review_date = new Date();
        next_review_date.setDate(next_review_date.getDate() + interval);

        return {
            ease_factor: parseFloat(ease_factor.toFixed(2)),
            interval,
            repetitions,
            next_review_date: next_review_date.toISOString(),
            quality
        };
    }

    /**
     * Calcula a qualidade baseada na resposta do usuário
     * @param {boolean} isCorrect - Se a resposta está correta
     * @param {number} responseTime - Tempo de resposta em segundos
     * @param {number} expectedTime - Tempo esperado em segundos
     * @returns {number} - Qualidade (0-5)
     */
    static calculateQuality(isCorrect, responseTime, expectedTime = 3) {
        if (!isCorrect) {
            return 0; // Esqueceu completamente
        }

        const ratio = responseTime / expectedTime;
        
        if (ratio <= 0.5) {
            return 5; // Resposta perfeita e rápida
        } else if (ratio <= 1.0) {
            return 4; // Resposta correta com leve hesitação
        } else if (ratio <= 2.0) {
            return 3; // Resposta correta com dificuldade
        } else {
            return 2; // Resposta correta mas demorou muito
        }
    }

    /**
     * Verifica se um cartão está pronto para revisão
     * @param {string} nextReviewDate - Data da próxima revisão
     * @returns {boolean}
     */
    static isDueForReview(nextReviewDate) {
        const now = new Date();
        const reviewDate = new Date(nextReviewDate);
        return now >= reviewDate;
    }

    /**
     * Retorna cartões que estão prontos para revisão
     * @param {Array} cards - Lista de cartões
     * @param {number} limit - Limite de cartões a retornar
     * @returns {Array}
     */
    static getDueCards(cards, limit = 20) {
        return cards
            .filter(card => this.isDueForReview(card.next_review_date))
            .sort((a, b) => new Date(a.next_review_date) - new Date(b.next_review_date))
            .slice(0, limit);
    }

    /**
     * Calcula estatísticas de retenção
     * @param {Array} reviews - Lista de revisões
     * @returns {Object}
     */
    static calculateRetentionStats(reviews) {
        if (reviews.length === 0) {
            return {
                total_reviews: 0,
                correct_count: 0,
                accuracy: 0,
                average_quality: 0,
                average_interval: 0
            };
        }

        const correct_count = reviews.filter(r => r.quality >= 3).length;
        const total_quality = reviews.reduce((sum, r) => sum + r.quality, 0);
        const total_interval = reviews.reduce((sum, r) => sum + r.interval, 0);

        return {
            total_reviews: reviews.length,
            correct_count,
            accuracy: parseFloat(((correct_count / reviews.length) * 100).toFixed(2)),
            average_quality: parseFloat((total_quality / reviews.length).toFixed(2)),
            average_interval: Math.round(total_interval / reviews.length)
        };
    }
}

module.exports = SRSAlgorithm;
