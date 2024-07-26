const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0,
})

export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number)
}


export const generateYAxis = (monthlySales: { revenue: number; month: any }[]) => {
    const yAxisLabels = [];
    const revenue = monthlySales.map(monthlySale => monthlySale.revenue);
    const highestRecord = Math.max(...revenue);
    const topLabel = Math.ceil(highestRecord / 1000) * 1000;
  
    for (let i = topLabel; i >= 0; i -= 1000) {
      yAxisLabels.push(`₹${i / 1000}K`);
    }
  console.log("calling form fomatter: ",yAxisLabels,topLabel)
    return { yAxisLabels, topLabel };
  };