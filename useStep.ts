import { useState } from 'react';

const useStep = (initialStep = 0, steps) => {
    const [step, setStep] = useState(initialStep);

    const next = () => {
        if (step < steps - 1) setStep(step + 1);
    };

    const prev = () => {
        if (step > 0) setStep(step - 1);
    };

    const reset = () => setStep(initialStep);

    return { step, next, prev, reset, isFirstStep: step === 0, isLastStep: step === steps - 1 };
};

export default useStep;
