const moment = require('moment');
// Moment complains about RFC2822/ISO date not being correct
moment.suppressDeprecationWarnings = true;

const numeral = require('numeral');

module.exports = function (env) {
  /**
  * Instantiate object used to store the methods registered as a
  * 'filter' (of the same name) within nunjucks. You can override
  * gov.uk core filters by creating filter methods of the same name.
  * @type {Object}
  */
  let filters = {}

  /* ------------------------------------------------------------------
    date filter for use in Nunjucks
    example: {{ params.date | date("DD/MM/YYYY") }}
    outputs: 01/01/1970
  ------------------------------------------------------------------ */
  filters.date = function(timestamp, format) {
    return moment(timestamp).format(format);
  }

  /* ------------------------------------------------------------------
    dateAdd filter for use in Nunjucks
    example: {{ '1970-01-01' | dateAdd(1, 'weeks') | date("DD/MM/YYYY") }}
    outputs: 08/01/1970
  ------------------------------------------------------------------ */
  filters.dateAdd = function(date, num, unit='days') {
    return moment(date).add(num, unit).toDate();
  }

  /* ------------------------------------------------------------------
    utility date functions
  ------------------------------------------------------------------ */
  filters.govDate = function(timestamp) {
    return moment(timestamp).format('D MMMM YYYY');
  }

  filters.govShortDate = function(timestamp) {
    return moment(timestamp).format('D MMM YYYY');
  }

  filters.govTime = function(timestamp) {
    let t = moment(timestamp);
    if(t.minutes() > 0) {
      return t.format('h:mma');
    } else {
      return t.format('ha');
    }
  }

  /* ------------------------------------------------------------------
    numeral filter for use in Nunjucks
    example: {{ params.number | numeral("0,00.0") }}
    outputs: 1,000.00
  ------------------------------------------------------------------ */
  filters.numeral = function(number, format) {
    return numeral(number).format(format);
  }

  /* ------------------------------------------------------------------
    utility function to return a list from array
    example: {{ ["England","Scotland","Wales"] | arrayToList }}
    outputs: England, Scotland and Wales
  ------------------------------------------------------------------ */
  filters.arrayToList = function(array, join = ', ', final = ' and ') {
    var arr = array.slice(0);

    var last = arr.pop();

    if (array.length > 1) {
      return arr.join(join) + final + last;
    }

    return last;
  }

  /* ------------------------------------------------------------------
    utility function to get an error for a component
    example: {{ errors | getErrorMessage('title') }}
    outputs: "Enter a title"
  ------------------------------------------------------------------ */
  filters.getErrorMessage = function(array, fieldName) {
    if (!array || !fieldName)
      return null;

    let error = array.filter( (obj) =>
      obj.fieldName == fieldName
    )[0];

    return error;
  }

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
