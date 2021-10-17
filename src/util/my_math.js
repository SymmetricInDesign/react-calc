export const factorial = (n)=>{
    if (!Number.isInteger(n)) return "Input Error"
    if (n >= 171) return "Overflow Error"
    if (n<2) return n
    return n * factorial(n-1)
}