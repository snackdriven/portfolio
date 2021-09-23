<template>
  <the-report-page
    :header="header"
    :filter-panel="filterPanel"
    :kpi-deck="kpiDeck"
    :visuals="visuals"
  />
</template>

<script>
import { format } from 'd3'

export default {
  data() {
    const formatters = {
      number: (d) => (d ? format(',.0f')(d) : ''),
      percentWithTwoDecimals: format('.2%'),
    }

    return {
      header: {
        title: 'Consumer Finance Provider Health by Head',
        info: 'This report focuses on Providers who are not producing at the level we expect, rolled up by business development head. For each business development head, we show what proportion of their accounts are inactive in terms of submissions, or have too few fundings (low volume) and require intervention.  Note the report excludes Providers that Fully Offboarded, Closed, and those that are in the Application Process.',
        dataLastUpdated: {
          query: {
            measures: ['Loan.maxUpdatedAt'],
            segments: ['Loan.OnboardedNotCancelledProviders'],
          },
        },
        downloadAllAvailable: false,
        downloadFilteredAvailable: false,
      },
      filterPanel: {
        recordGranularity: 'providers',
        recordCount: {
          query: {
            measures: ['Loan.providerCount'],
            segments: ['Loan.OnboardedNotCancelledProviders'],
          },
        },
        segmentsForStandardFilters: ['Loan.OnboardedNotCancelledProviders'],
        filters: [
          { standardFilter: 'businessDevelopmentHead' },
          { standardFilter: 'provider' },
          { standardFilter: 'providerStatus' },
          { standardFilter: 'loanCategory' },
        ],
      },
      kpiDeck: {
        columnsPerCard: {
          xs: 12,
          md: 6,
          lg: 3,
        },
        kpis: [
          {
            label: 'Total Provider Count',
            query: {
              measures: ['Loan.providerCount'],
              segments: ['Loan.OnboardedNotCancelledProviders'],
            },
            rounded: false,
            format: 'number',
          },
          {
            label: 'Non-Active Provider Count',
            info: 'Count of providers with zero submissions and less than 5 funded loans in the last 30 days',
            query: {
              measures: ['Loan.providerCountNonActive'],
              segments: ['Loan.OnboardedNotCancelledProviders'],
            },
            rounded: false,
            format: 'number',
          },
          {
            label: 'Too Low Provider Count',
            info: 'Count of providers with some submissions and less than 5 funded loans in the last 30 days',
            query: {
              measures: ['Loan.providerCountTooLow'],
              segments: ['Loan.OnboardedNotCancelledProviders'],
            },
            rounded: false,
            format: 'number',
          },
          {
            label: 'Effective Provider Count',
            info: 'Count of providers with some submissions and at least 5 funded loans in the last 30 days',
            query: {
              measures: ['Loan.providerCountEffective'],
              segments: ['Loan.OnboardedNotCancelledProviders'],
            },
            rounded: false,
            format: 'number',
          },
          {
            label: 'Total Provider Volume',
            query: {
              measures: ['Loan.totalAmount'],
              segments: ['Loan.OnboardedNotCancelledProviders'],
            },
            format: 'dollars',
            precision: 4,
          },
          {
            label: 'Non-Active Provider Volume',
            info: 'Volume submitted by providers with zero submissions and less than 5 funded loans in the last 30 days',
            query: {
              measures: ['Loan.providerVolumeNonActive'],
              segments: ['Loan.OnboardedNotCancelledProviders'],
            },
            format: 'dollars',
            precision: 4,
          },
          {
            label: 'Too Low Provider Volume',
            info: 'Volume submitted by providers with some submissions and less than 5 funded loans in the last 30 days',
            query: {
              measures: ['Loan.providerVolumeTooLow'],
              segments: ['Loan.OnboardedNotCancelledProviders'],
            },
            format: 'dollars',
            precision: 4,
          },
          {
            label: 'Effective Provider Volume',
            info: 'Volume submitted by providers with some submissions and at least 5 funded loans in the last 30 days',
            query: {
              measures: ['Loan.providerVolumeEffective'],
              segments: ['Loan.OnboardedNotCancelledProviders'],
            },
            format: 'dollars',
            precision: 4,
          },
        ],
      },
      visuals: [
        {
          title: 'Provider Health Distribution',
          info: '<ul><li><b>Non-Active Providers</b>: zero submissions <b>and</b> less than 5 funded loans</li><li><b>Too Low Volume Providers</b>: some submissions <b>and</b> less than 5 funded loans</li><li><B>Effective Providers</b>: some submissions <b>and</b> at least 5 funded loans in the last 30 days</li></ul>',
          component: 'ChartStackedBar',
          componentProps: {
            barHeight: 30,
            margin: {
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            },
            showLegend: true,
            legendSelectable: true,
            colors: ['#a3a3a3', '#ec714f', '#1ea092'],
            valueAccessor: (d) => d.value,
            segmentAccessor: (d) => d.name,
            segmentLabel: 'Health',
          },
          query: {
            measures: [
              'Loan.providerCountNonActive',
              'Loan.providerCountTooLow',
              'Loan.providerCountEffective',
            ],
            segments: ['Loan.OnboardedNotCancelledProviders'],
          },
          callback: (res) => {
            const data = res.rawData()[0]
            return [
              {
                name: 'Non-Active',
                value: data['Loan.providerCountNonActive'],
              },
              {
                name: 'Too Low',
                value: data['Loan.providerCountTooLow'],
              },
              {
                name: 'Effective',
                value: data['Loan.providerCountEffective'],
              },
            ]
          },
        },
        {
          title: 'Summary by Business Development Head',
          component: 'DataTable',
          componentProps: {
            searchable: true,
            downloadable: true,
            columns: [
              {
                key: 'Loan.bdh',
                label: 'Business Development Head',
                stickyColumn: true,
                isRowHeader: true,
                thClass: 'text-left',
              },
              {
                key: 'Loan.providerCount',
                label: 'Total Providers',
                formatter: formatters.number,
              },
              {
                key: 'Loan.providerCountNonActive',
                label: 'Non-Active',
                formatter: formatters.number,
              },
              {
                key: 'Loan.providerCountNonActivePct',
                label: 'Non-Active %',
                formatter: formatters.percentWithTwoDecimals,
              },
              {
                key: 'Loan.providerCountTooLow',
                label: 'Too Low',
                formatter: formatters.number,
              },
              {
                key: 'Loan.providerCountTooLowPct',
                label: 'Too Low %',
                formatter: formatters.percentWithTwoDecimals,
              },
              {
                key: 'Loan.providerCountNonActiveTooLowPct',
                label: 'Non-Active + Too Low %',
                formatter: formatters.percentWithTwoDecimals,
              },
              {
                key: 'Loan.providerCountEffective',
                label: 'Effective Providers',
                formatter: formatters.number,
              },
              {
                key: 'Loan.providerCountEffectivePct',
                label: 'Effective Providers %',
                formatter: formatters.percentWithTwoDecimals,
              },
            ],
          },
          query: {
            measures: [
              'Loan.providerCount',
              'Loan.providerCountNonActive',
              'Loan.providerCountNonActivePct',
              'Loan.providerCountTooLow',
              'Loan.providerCountTooLowPct',
              'Loan.providerCountNonActiveTooLowPct',
              'Loan.providerCountEffective',
              'Loan.providerCountEffectivePct',
            ],
            dimensions: ['Loan.bdh'],
            segments: ['Loan.OnboardedNotCancelledProviders'],
            order: {
              'Loan.bdh': 'asc',
            },
          },
        },
        {
          title: 'Non-Active and Too Low Providers',
          info: 'Providers that have zero submissions AND less than 5 funded loans in the last thirty days are considered <b>Non-Active.</b><p></p>Providers that have greater than zero submissions AND less than 5 funded loans in the last thirty days are considered <b>Too Low</b>.',
          component: 'DataTable',
          componentProps: {
            searchable: true,
            downloadable: true,
            columns: [
              {
                key: 'Loan.bdh',
                label: 'Business Development Head',
                tdClass: 'text-left',
              },
              {
                key: 'Loan.provider',
                label: 'Provider',
                tdClass: 'text-left',
              },
              {
                key: 'health',
                label: 'Provider Health',
                tdClass: (val, key, item) => {
                  if (val === 'Too Low') {
                    return 'too-low'
                  } else {
                    return 'non-active'
                  }
                },
              },
              {
                key: 'Loan.submittedLoanCount',
                label: 'Submitted All Time',
                formatter: formatters.number,
              },
              {
                key: 'Loan.loanCountSubmitted1to30',
                label: 'Submitted R30',
                formatter: formatters.number,
              },
              {
                key: 'Loan.fundedLoanCount',
                label: 'Funded All Time',
                formatter: formatters.number,
              },
              {
                key: 'Loan.loanCountFunded1to30',
                label: 'Funded R30',
                formatter: formatters.number,
              },
            ],
          },
          query: {
            measures: [
              'Loan.loanCountFunded1to30',
              'Loan.loanCountSubmitted1to30',
              'Loan.submittedLoanCount',
              'Loan.fundedLoanCount',
            ],
            dimensions: ['Loan.provider', 'Loan.bdh'],
            segments: ['Loan.OnboardedNotCancelledProviders'],
            filters: [
              {
                member: 'Loan.loanCountFunded1to30',
                operator: 'lt',
                values: ['5'],
              },
            ],
            order: {
              'Loan.bdh': 'asc',
              'Loan.loanCountSubmitted1to30': 'asc',
              'Loan.provider': 'asc',
            },
          },
          callback: (res) => {
            const data = res.rawData()
            const submittedCount = 'Loan.loanCountSubmitted1to30'
            return data.map((d) => {
              if (+d[submittedCount] === 0) {
                return { health: 'Non-Active', ...d }
              } else {
                return { health: 'Too Low', ...d }
              }
            })
          },
        },
      ],
    }
  },
}
</script>
<style>
.data-table .too-low {
  background-color: #ec714f;
}

.non-active {
  background-color: #a3a3a3;
}
</style>
