/**
 * Deepfake Detection Service
 * Integration logic for neural inference models.
 */

export interface DeepfakeResult {
    deepfake_probability: number;
    verdict: 'REAL' | 'FAKE' | 'SUSPICIOUS';
    signals: string[];
}

/**
 * Simulates a deepfake detection inference.
 * In production, this would call a Python FastAPI backend or an ONNX model.
 */
export async function detectDeepfake(file: File): Promise<DeepfakeResult> {
    // Deterministic simulation logic based on file name or size for predictable testing
    // Instead of Math.random(), we use the file size to generate a consistent score
    const luck = (file.size % 100);
    
    let verdict: 'REAL' | 'FAKE' | 'SUSPICIOUS';
    let signals: string[] = [];

    if (luck > 80) {
        verdict = 'FAKE';
        signals = ['Eye blinking inconsistency', 'Artifacts in boundary regions', 'Static background noise'];
    } else if (luck > 40) {
        verdict = 'SUSPICIOUS';
        signals = ['Subtle lighting mismatches', 'Low resolution synthesis signs'];
    } else {
        verdict = 'REAL';
        signals = ['Natural skin texture mapped', 'Consistent shadow propagation'];
    }

    return {
        deepfake_probability: Math.round(luck),
        verdict,
        signals
    };
}
