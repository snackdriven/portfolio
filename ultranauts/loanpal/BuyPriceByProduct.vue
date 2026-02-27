<template>
  <the-report-page
    :header="header"
    :filter-panel="filterPanel"
    :visuals="visuals"
  />
</template>

<script>
import { format, timeDay, timeFormat, timeParse } from 'd3'
import { lpColorPalette } from '~/components/Chart/Utility/ChartUtilityColorScale'
export default {
  data() {
    const segments = ['Loan.LoanFunded']
    const timeParser = timeParse('%Y-%m-%dT%H:%M:%S.%L')
    const formatters = {
      percent: (d) => (d === null ? '' : format(',.2%')(d)),
      number: format(',.0f'),
      singleDecimal: format(',.1f'),
      decimal: format(',.2f'),
      day: timeFormat('%m-%d-%Y'),
      date: (d) => timeFormat('%m/%d/%Y')(timeParser(d)),
      buyPrice: (d) => formatters.decimal(+d * 100),
      buyPriceYAxis: (d) => formatters.number(+d * 100),
    }
    const margin = {
      top: 25,
      right: 25,
      bottom: 50,
      left: 30,
    }
    const tooltipFormat = (time) => (d) => {
      if (time === 'Month') {
        return `Month: ${timeFormat('%b %Y')(d)}`
      } else if (time === 'Week') {
        return `${formatters.day(d)} to ${formatters.day(timeDay.offset(d, 6))}`
      } else {
        return `${time}: ${timeFormat('%m-%d-%Y')(d)}`
      }
    }
    const generateInterestQuery = (time) => {
      return {
        measures: ['Loan.avgBuyPrice', 'Loan.avgRate'],
        timeDimensions: [
          {
            dimension: 'Loan.fundCompletedDate',
            granularity: time.toLowerCase(),
          },
        ],
        segments,
      }
    }
    const generateTermQuery = (time) => {
      return {
        measures: ['Loan.avgBuyPrice', 'Loan.avgTerm'],
        timeDimensions: [
          {
            dimension: 'Loan.fundCompletedDate',
            granularity: time.toLowerCase(),
          },
        ],
        segments,
      }
    }
    const generateFicoQuery = (time) => {
      return {
        measures: ['Loan.avgBuyPrice', 'Loan.avgFico'],
        timeDimensions: [
          {
            dimension: 'Loan.fundCompletedDate',
            granularity: time.toLowerCase(),
          },
        ],
        segments,
      }
    }
    const generateMarketQuery = (time) => {
      return {
        measures: [
          'GoldmanMarketRates.maxLibor1YearInterestRate',
          'GoldmanMarketRates.maxSwap3YearRate',
          'GoldmanMarketRates.maxSwap5YearRate',
        ],
        timeDimensions: [
          {
            dimension: 'GoldmanMarketRates.asOfDate',
            granularity: time.toLowerCase(),
          },
        ],
      }
    }
    const interestConfig = []
    for (const x of ['Month', 'Week', 'Day']) {
      interestConfig.push({
        params: { 'Funded Time Frame': x },
        syncAlias: `${x}`,
        query: generateInterestQuery(x),
        componentProps: {
          xAccessor: (d) => timeParser(d['Loan.fundCompletedDate']),
          layers: [
            {
              label: 'Interest Rate',
              format: formatters.decimal,
              accessor: (d) => +d['Loan.avgRate'],
              type: 'line',
              color: lpColorPalette[9],
            },
            {
              label: 'Buy Price',
              type: 'line',
              accessor: (d) => +d['Loan.avgBuyPrice'],
              axisRight: true,
              format: formatters.buyPrice,
              color: lpColorPalette[2],
            },
          ],
          tooltipOptions: {
            xFormat: tooltipFormat(x),
          },
          legendSelectable: true,
          showPoints: x !== 'Day',
          xAxisOptions: {
            rotated: true,
          },
          yAxisOptions: {
            left: {
              label: 'Interest Rate',
              tickFormat: formatters.singleDecimal,
            },
            right: {
              label: 'Buy Price',
              tickFormat: formatters.buyPriceYAxis,
            },
          },
          margin,
        },
      })
    }
    const ficoConfig = []
    for (const x of ['Month', 'Week', 'Day']) {
      ficoConfig.push({
        params: { 'Funded Time Frame': x },
        syncAlias: `${x}`,
        query: generateFicoQuery(x),
        componentProps: {
          xAccessor: (d) => timeParser(d['Loan.fundCompletedDate']),
          layers: [
            {
              label: 'FICO',
              color: lpColorPalette[5],
              format: formatters.number,
              accessor: (d) => +d['Loan.avgFico'],
              type: 'line',
            },
            {
              label: 'Buy Price',
              type: 'line',
              axisRight: true,
              format: formatters.buyPrice,
              accessor: (d) => +d['Loan.avgBuyPrice'],
              color: lpColorPalette[2],
            },
          ],
          tooltipOptions: {
            xFormat: tooltipFormat(x),
          },
          legendSelectable: true,
          showPoints: x !== 'Day',
          xAxisOptions: {
            rotated: true,
          },
          yAxisOptions: {
            left: {
              label: 'FICO',
              tickFormat: formatters.number,
            },
            right: {
              label: 'Buy Price',
              tickFormat: formatters.buyPriceYAxis,
            },
          },
          margin,
        },
      })
    }
    const termConfig = []
    for (const x of ['Month', 'Week', 'Day']) {
      termConfig.push({
        params: { 'Funded Time Frame': x },
        syncAlias: `${x}`,
        query: generateTermQuery(x),
        componentProps: {
          xAccessor: (d) => timeParser(d['Loan.fundCompletedDate']),
          layers: [
            {
              label: 'Term',
              color: lpColorPalette[6],
              format: formatters.decimal,
              accessor: (d) => +d['Loan.avgTerm'],
              type: 'line',
            },
            {
              label: 'Buy Price',
              type: 'line',
              axisRight: true,
              format: formatters.buyPrice,
              accessor: (d) => +d['Loan.avgBuyPrice'],
              color: lpColorPalette[2],
            },
          ],
          tooltipOptions: {
            xFormat: tooltipFormat(x),
          },
          legendSelectable: true,
          showPoints: x !== 'Day',
          xAxisOptions: {
            rotated: true,
          },
          yAxisOptions: {
            left: {
              label: 'Term',
              tickFormat: formatters.number,
            },
            right: {
              label: 'Buy Price',
              tickFormat: formatters.buyPriceYAxis,
            },
          },
          margin,
        },
      })
    }
    const marketConfig = []
    for (const x of ['Month', 'Week', 'Day']) {
      marketConfig.push({
        params: { 'Funded Time Frame': x },
        syncAlias: `${x}`,
        query: generateMarketQuery(x),
        componentProps: {
          xAccessor: (d) => timeParser(d['GoldmanMarketRates.asOfDate']),
          margin,
          tooltipOptions: {
            xFormat: tooltipFormat(x),
          },
          legendSelectable: true,
          showPoints: x !== 'Day',
          xAxisOptions: {
            label: 'Date',
          },
          yAxisOptions: {
            label: 'Market Rate',
            tickFormat: formatters.decimal,
          },
          layers: [
            {
              label: '1 Yr LIBOR',
              color: lpColorPalette[12],
              format: formatters.decimal,
              accessor: (d) =>
                +d['GoldmanMarketRates.maxLibor1YearInterestRate'],
              type: 'line',
            },
            {
              label: '3 Yr Swap',
              type: 'line',
              format: formatters.decimal,
              accessor: (d) => +d['GoldmanMarketRates.maxSwap3YearRate'],
              color: lpColorPalette[14],
            },
            {
              label: '5 Yr Swap',
              type: 'line',
              format: formatters.decimal,
              accessor: (d) => +d['GoldmanMarketRates.maxSwap5YearRate'],
              color: lpColorPalette[16],
            },
          ],
        },
      })
    }
    return {
      header: {
        title: 'Buy Price by Product',
        info:
          'Report seeks to show the trends in our consumer finance portfolio product components (Interest rate, Term, and FICO) with respect to Buy Rate (the pricing factor at which we buy loans from installer providers, 100 - Dealer Fee). All loans that reached funding completion at some point, even if they were subsequently net funded, are included in the report.',
        dataLastUpdated: {
          query: {
            measures: ['Loan.maxUpdatedAt'],
            limit: 1,
          },
        },
        downloadAllAvailable: false,
        downloadFilteredAvailable: false,
      },
      filterPanel: {
        recordGranularity: 'loans',
        recordCount: {
          query: {
            measures: ['Loan.uniqueLoanCount'],
            segments,
          },
        },
        segmentsForStandardFilters: segments,
        filters: [
          { standardFilter: 'fundedDate' },
          { standardFilter: 'currentOwner' },
          { standardFilter: 'provider' },
          { standardFilter: 'providerStatus' },
          { standardFilter: 'businessDevelopmentHead' },
          { standardFilter: 'loanCategory' },
          { standardFilter: 'loanProduct' },
          { standardFilter: 'promotionalMonths' },
          { standardFilter: 'fico' },
          { standardFilter: 'loanAmount' },
          { standardFilter: 'income' },
          { standardFilter: 'term' },
          { standardFilter: 'rate' },
        ],
      },
      visuals: [
        // ~ <---- INTEREST RATE VS BUY RATE---->
        {
          title: 'Interest Rate w/ Autopay vs Buy Rate',
          component: 'ChartLine',
          columns: {
            lg: 12,
            xl: 6,
          },
          configurations: interestConfig,
        },
        // ~ <---- LOAN TERM VS BUY RATE---->
        {
          title: 'Loan Term vs Buy Rate',
          component: 'ChartLine',
          type: 'chart',
          columns: {
            lg: 12,
            xl: 6,
          },
          configurations: termConfig,
        },
        // ~ <---- FICO VS BUY RATE---->
        {
          title: 'FICO vs Buy Rate',
          component: 'ChartLine',
          type: 'chart',
          columns: {
            lg: 12,
            xl: 6,
          },
          configurations: ficoConfig,
        },
        // ~ <---- MARKET RATES---->
        {
          title: 'Market Rates',
          component: 'ChartLine',
          info:
            'What are the average 1 year Libor, the 3 year rate swap, and the 5 year rate swap during the given period of time that loans were funded? Market rate data is collected everyday after the market closes. These rates impact the determination of our sell rate, what GoodLeap can sell an asset for to investors. ',
          columns: {
            lg: 12,
            xl: 6,
          },
          configurations: marketConfig,
        },
        // & <---- LOAN LEVEL DETAILS TABLE ---->
        {
          title: 'Loan Level Details',
          component: 'DataTable',
          componentProps: {
            downloadable: false,
            searchable: false,
            columnInfo: {
              'Loan.fundCompletedDate':
                'The initial date when loan reach full funding completion; this date is locked in even if a net funded loan subsequently gets a new fund completed date.',
            },
            columns: [
              {
                key: 'Loan.loanId',
                label: 'Loan ID',
                tdClass: 'text-left',
              },
              {
                key: 'Loan.fundCohort',
                label: 'Fund Cohort',
                tdClass: 'text-right',
              },
              {
                key: 'Loan.fundCompletedDate',
                label: 'Fund Date',
                tdClass: 'text-right',
                formatter: formatters.date,
              },
              {
                key: 'Loan.term',
                label: 'Term',
                tdClass: 'text-right',
              },
              {
                key: 'Loan.fundCohort',
                label: 'Fund Cohort',
                tdClass: 'text-right',
              },
              {
                key: 'Loan.rate',
                label: 'Rate',
                tdClass: 'text-right',
              },
              {
                key: 'Loan.avgBuyPrice',
                label: 'Buy Price',
                tdClass: 'text-right',
                formatter: formatters.buyPrice,
              },
              {
                key: 'Loan.fico',
                label: 'FICO',
                tdClass: 'text-right',
              },
              {
                key: 'Loan.provider',
                label: 'Provider',
                tdClass: 'text-left',
              },
              {
                key: 'Loan.currentOwner',
                label: 'Current Owner',
                tdClass: 'text-left',
              },
              {
                key: 'Loan.loanAmountBand',
                label: 'Loan Amount Band',
                tdClass: 'text-right',
              },
              {
                key: 'Loan.incomeBand',
                label: 'Income Band',
                tdClass: 'text-right',
              },
            ],
            hydrated: true,
            hydrationQuery: {
              measures: ['Loan.avgBuyPrice'],
              dimensions: [
                'Loan.loanId',
                'Loan.provider',
                'Loan.fico',
                'Loan.currentOwner',
                'Loan.rate',
                'Loan.loanAmountBand',
                'Loan.incomeBand',
                'Loan.fundCohort',
                'Loan.fundCompletedDate',
                'Loan.term',
              ],
              segments,
              order: { 'Loan.fundCompletedDate': 'desc' },
            },
          },
          query: {
            measures: ['Loan.uniqueLoanCount'],
            segments,
          },
        },
      ],
    }
  },
}
</script>
