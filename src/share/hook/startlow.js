import { useState } from 'react';

/**
 * [isShowNextFlow, showFlowInfo, finishFlowStarting]
 * @returns
 */
export const useFlowStart = () => {
    const [isShowNextFlow, setShowNextFlow] = useState(false);

    const finishFlowStarting = () => {
        setShowNextFlow(false);
    };

    const showFlowInfo = () => {
        setShowNextFlow(true);
    };

    return [isShowNextFlow, showFlowInfo, finishFlowStarting];
};
