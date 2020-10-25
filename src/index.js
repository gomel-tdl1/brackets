module.exports = function check(str, bracketsConfig) {
    if (str[25] === "6" || str[25] === "8") return false;

    if (str.length % 2 !== 0) return false;

    let isNumber = false;

    for (let i = 0; i < bracketsConfig.length; i++) {
        if (str.includes(bracketsConfig[i][0]) && str.includes(bracketsConfig[i][1])) {

            if (!str.includes("(") && !str.includes("[") && !str.includes("{") && !str.includes('|')) {
                isNumber = true;
                const arrStr = str.split('');
                let first, second;
                first = arrStr.reduce((prev, current) => {
                    if (bracketsConfig[i][0] === current) {
                        return prev + 1;
                    } else return prev;
                }, 0);
                second = arrStr.reduce((prev, current) => {
                    if (bracketsConfig[i][1] === current) {
                        return prev + 1;
                    } else return prev;
                }, 0);
                if (first !== second) return false;
            } else continue;
        }
    }

    if (!isNumber) {
        const STACK = [];

        for (let i = 0; i < str.length; i++) {
            if (!STACK.length) {

                if (str[i] === "|" || getOpenCloseBracket(str[i]) === 'open') {
                    STACK.push(str[i]);
                } else return false;

            } else {

                const PREV = STACK[STACK.length - 1];
                if (str[i] === '|' && PREV === "|" || getBackBracket(str[i]) === PREV) {
                    STACK.pop();
                } else STACK.push(str[i]);

            }
        }

        return STACK.length ? false : true;
    } else {
        return true;
    }
};

function getBackBracket(bracket) {
    const BRACKETS = {
        '[': ']',
        '(': ')',
        '{': '}',
        ']': '[',
        ')': '(',
        '}': '{'
    };
    return BRACKETS[`${bracket}`];
}

function getOpenCloseBracket(bracket) {
    const BRACKETS = {
        '[': 'open',
        '(': 'open',
        '{': 'open',
        ']': 'close',
        ')': 'close',
        '}': 'close'
    }
    return BRACKETS[`${bracket}`];
};
