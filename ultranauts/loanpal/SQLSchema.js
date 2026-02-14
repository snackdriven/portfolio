cube(`ContactCenterEvent`, {
  sql: `SELECT
            loan_id,
            activity,
            date,
            credit_union,
            call_type,
            updated,
            disposition
         from prod.contact_center_events`,

  joins: {
    Loan: {
      relationship: `belongsTo`,
      sql: `${Loan}.loan_id = ${ContactCenterEvent}.loan_id`,
    },
  },
  measures: {
    countEvents: {
      sql: `1`,
      type: `sum`,
      format: `number`,
    },
    countEventsR30: {
      sql: `1`,
      type: `sum`,
      format: `number`,
      rollingWindow: { trailing: `30 day` },
    },
    maxUpdatedAt: {
      sql: 'updated',
      type: 'max',
    },
    countConnectedEvents: {
      sql: `1`,
      type: `count`,
      format: `number`,
      filters: [{ sql: `${disposition} = 'Connected'` }],
    },
    countVoicemailEvents: {
      sql: `1`,
      type: `count`,
      format: `number`,
      filters: [{ sql: `${disposition} = 'Left Voicemail'` }],
    },
    countNoAnswerEvents: {
      sql: `1`,
      type: `count`,
      format: `number`,
      filters: [{ sql: `${disposition} = 'No Answer'` }],
    },
    countScheduledCallbackEvents: {
      sql: `1`,
      type: `count`,
      format: `number`,
      filters: [{ sql: `${disposition} = 'Scheduled Call Back'` }],
    },
    countInvalidNumberEvents: {
      sql: `1`,
      type: `count`,
      format: `number`,
      filters: [{ sql: `${disposition} = 'Invalid Number'` }],
    },
    countGeneralCallbackEvents: {
      sql: `1`,
      type: `count`,
      format: `number`,
      filters: [{ sql: `${disposition} = 'General Call Back'` }],
    },
    countBusyEvents: {
      sql: `1`,
      type: `count`,
      format: `number`,
      filters: [{ sql: `${disposition} = 'Busy'` }],
    },
  },

  dimensions: {
    loanId: {
      sql: `${CUBE}.activity || ${CUBE}.date || ${CUBE}.loan_id`,
      type: `string`,
      primaryKey: true,
    },
    creditUnion: { sql: `credit_union`, type: `string` },
    callType: { sql: `call_type`, type: `string` },
    date: { sql: `date`, type: `time` },
    activity: { sql: `activity`, type: `string` },
    disposition: { sql: `disposition`, type: `string` },
  },
  segments: {
    EventIsCall: {
      sql: `activity = 'call'`,
    },
  },
  refreshKey: {
    sql: `SELECT MAX(updated) FROM prod.contact_center_events`,
  },
})
