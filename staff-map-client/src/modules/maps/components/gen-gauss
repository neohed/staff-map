function gaussian(mean: number, stDev: number) {
    let y2: number;
    let use_last = false;

    return function() {
        let y1: number;

        if (use_last) {
            y1 = y2;
            use_last = false
        } else {
            let x1: number, x2: number, w: number;

            do {
                x1 = 2 * Math.random() - 1;
                x2 = 2 * Math.random() - 1;
                w = x1**2 + x2**2
            } while (w >= 1);

            w = Math.sqrt(-2 * Math.log(w) / w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true
        }

        const ret = mean + stDev * y1;

        return (ret > 0)
            ? ret
            : -ret
    }
}

type Point = {
    x: number;
    y: number;
}

function generateRandomClusterPoints(size: number, stDev: number, orig: Point) {
    const {x, y} = orig;

    const genX = gaussian(x, stDev);
    const genY = gaussian(y, stDev);
    
    return [...Array(size).keys()].map(() => ({x: genX(), y: genY()}))
}

export {
    generateRandomClusterPoints,
}
//const data = generateRandomClusterPoints(20, .9, {x: 1000, y: 50})
//console.log(data)