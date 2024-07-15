export function getBars(A, n) {
    if(A.length == 0) {
        const randomArray = [];
        for (let i = 0; i < n; i++) {
            randomArray.push(Math.floor(Math.random() * 901) + 100);
        }
        A=randomArray;
    }

    const bars = [];
    for(let i = 0; i < n; i++) {
        bars.push({
            element: A[i],
            underEvaluation: false,
            completed: false,
            special: false,
            smaller: false,
        })
    }

    return bars;
}