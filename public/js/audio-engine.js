/**
 * AUDIO ENGINE - Sistema de áudio premium para English Master
 * Melhorias: vozes premium, controle de velocidade, pitch, volume
 * Suporte a múltiplos idiomas e sotaques
 */

class AudioEngine {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.currentVoice = null;
        this.settings = {
            rate: 1.0,           // Velocidade (0.1 a 10)
            pitch: 1.0,          // Pitch (0 a 2)
            volume: 1.0,         // Volume (0 a 1)
            lang: 'en-US',       // Idioma padrão
            voiceGender: 'female' // 'male' ou 'female'
        };
        
        this.loadVoices();
        
        // Recarregar vozes quando estiverem disponíveis
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
    }

    loadVoices() {
        this.voices = this.synth.getVoices();
        console.log(`🎤 ${this.voices.length} vozes carregadas`);
        
        // Tentar selecionar voz premium automaticamente
        this.selectBestVoice();
    }

    selectBestVoice() {
        // Prioridade: Google voices, Microsoft voices, Amazon voices
        const preferredVoices = [
            'Google US English',
            'Microsoft Zira',
            'Microsoft David',
            'Amazon Polly',
            'Samantha',
            'Victoria'
        ];

        // Filtrar vozes em inglês
        const englishVoices = this.voices.filter(v => v.lang.startsWith('en'));
        
        // Tentar encontrar voz premium
        for (const preferred of preferredVoices) {
            const found = englishVoices.find(v => 
                v.name.toLowerCase().includes(preferred.toLowerCase())
            );
            if (found) {
                this.currentVoice = found;
                console.log(`✅ Voz selecionada: ${found.name}`);
                return;
            }
        }

        // Fallback para primeira voz em inglês
        if (englishVoices.length > 0) {
            this.currentVoice = englishVoices[0];
            console.log(`✅ Voz fallback: ${this.currentVoice.name}`);
        }
    }

    speak(text, options = {}) {
        if (!text || !this.synth) {
            console.warn('⚠️ Texto vazio ou speechSynthesis não disponível');
            return;
        }

        // Cancelar fala anterior
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Aplicar configurações
        utterance.rate = options.rate || this.settings.rate;
        utterance.pitch = options.pitch || this.settings.pitch;
        utterance.volume = options.volume || this.settings.volume;
        utterance.lang = options.lang || this.settings.lang;

        // Selecionar voz
        if (options.voice) {
            utterance.voice = options.voice;
        } else if (this.currentVoice) {
            utterance.voice = this.currentVoice;
        }

        // Eventos
        utterance.onstart = () => {
            if (options.onStart) options.onStart();
        };

        utterance.onend = () => {
            if (options.onEnd) options.onEnd();
        };

        utterance.onerror = (event) => {
            console.error('❌ Erro no áudio:', event.error);
            if (options.onError) options.onError(event);
        };

        this.synth.speak(utterance);
    }

    speakSlow(text, callback) {
        this.speak(text, { 
            rate: 0.8, 
            onEnd: callback 
        });
    }

    speakFast(text, callback) {
        this.speak(text, { 
            rate: 1.2, 
            onEnd: callback 
        });
    }

    speakWord(word, callback) {
        this.speak(word, { 
            rate: 0.9,
            pitch: 1.1,
            onEnd: callback 
        });
    }

    speakSentence(sentence, callback) {
        this.speak(sentence, { 
            rate: 1.0,
            onEnd: callback 
        });
    }

    speakWithEmphasis(text, emphasisWord, callback) {
        // Dividir o texto e enfatizar a palavra específica
        const parts = text.split(new RegExp(`(${emphasisWord})`, 'gi'));
        
        let index = 0;
        const speakNext = () => {
            if (index >= parts.length) {
                if (callback) callback();
                return;
            }

            const part = parts[index];
            const isEmphasis = part.toLowerCase() === emphasisWord.toLowerCase();

            this.speak(part, {
                rate: isEmphasis ? 0.7 : 1.0,
                pitch: isEmphasis ? 1.2 : 1.0,
                volume: isEmphasis ? 1.0 : 0.9,
                onEnd: () => {
                    index++;
                    speakNext();
                }
            });
        };

        speakNext();
    }

    setSpeed(rate) {
        this.settings.rate = Math.max(0.1, Math.min(10, rate));
        console.log(`🎚️ Velocidade ajustada para ${this.settings.rate}`);
    }

    setPitch(pitch) {
        this.settings.pitch = Math.max(0, Math.min(2, pitch));
        console.log(`🎚️ Pitch ajustado para ${this.settings.pitch}`);
    }

    setVolume(volume) {
        this.settings.volume = Math.max(0, Math.min(1, volume));
        console.log(`🎚️ Volume ajustado para ${this.settings.volume}`);
    }

    setVoice(voiceName) {
        const voice = this.voices.find(v => v.name === voiceName);
        if (voice) {
            this.currentVoice = voice;
            console.log(`✅ Voz alterada para: ${voice.name}`);
        } else {
            console.warn(`⚠️ Voz não encontrada: ${voiceName}`);
        }
    }

    getAvailableVoices() {
        return this.voices.filter(v => v.lang.startsWith('en'));
    }

    stop() {
        this.synth.cancel();
    }

    pause() {
        this.synth.pause();
    }

    resume() {
        this.synth.resume();
    }

    isSpeaking() {
        return this.synth.speaking;
    }
}

// Instância global
const audioEngine = new AudioEngine();

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.audioEngine = audioEngine;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioEngine;
}
