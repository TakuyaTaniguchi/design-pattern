import React from 'react';
import { configManager } from './index';
export const ConfigDemo: React.FC = () => {

    const instance1 = configManager
    const instance2 = configManager

    if(instance1 === instance2) {
        console.log('同じインスタンスです。')
    } else {
        console.log('異なるインスタンスです。')
    }


    return (
        <div>サンプル</div>
    )
}