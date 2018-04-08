/**
 * @author lany44
 * @date 2018/3/26-下午4:51
 * @file tooltip.js
 */

import {initPosition} from '../../component/b-popper/position';

let toolTipEle;

export default {
    bind() {
        if (!toolTipEle) {
            toolTipEle = document.createElement('span');

            toolTipEle.classList.add('b-tooltip');

            toolTipEle.addEventListener('mouseover', () => {
                Object.assign(toolTipEle.style, {
                    display: 'block'
                });
            });

            toolTipEle.addEventListener('mouseout', () => {
                Object.assign(toolTipEle.style, {
                    display: 'none'
                });
            });

            document.body.appendChild(toolTipEle);
        }
    },

    inserted(el, {value}, vnode) {
        vnode.$$tooltipMouseover = () => {
            toolTipEle.innerText = value;
            Object.assign(toolTipEle.style, {
                display: 'block'
            });

            initPosition({
                $refEl: el,
                $el: toolTipEle,
                place: 'top-center'
            });
        };

        vnode.$$tooltipMouseout = () => {
            Object.assign(toolTipEle.style, {
                display: 'none'
            });
        };

        el.addEventListener('mouseover', vnode.$$tooltipMouseover);
        el.addEventListener('mouseout', vnode.$$tooltipMouseout);
    },

    unbind(el, binding, vnode) {
        if (vnode.$$tooltipMouseout) vnode.$$tooltipMouseout();

        el.removeEventListener('mouseover', vnode.$$tooltipMouseover);
        el.removeEventListener('mouseout', vnode.$$tooltipMouseout);
    }
};
