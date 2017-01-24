var zeropad = function (num) {
  return ((num < 10) ? '0' : '') + num;
};
var iso8601 = function (date) {
  return date.getUTCFullYear()
    + "-" + zeropad(date.getUTCMonth()+1)
    + "-" + zeropad(date.getUTCDate())
    + "T" + zeropad(date.getUTCHours())
    + ":" + zeropad(date.getUTCMinutes())
    + ":" + zeropad(date.getUTCSeconds()) + "Z";
};

function prepareDynamicDates() {
  $('abbr.loaded').attr("title", iso8601(new Date()));
  $('abbr.modified').attr("title", iso8601(new Date(document.lastModified)));
}

function loadPigLatin() {
  jQuery.timeago.settings.strings = {
    suffixAgo: "ago-hay",
    suffixFromNow: "omNow-fray",
    seconds: "ess-lay an-thay a-hay inute-may",
    minute: "about-hay a-hay inute-may",
    minutes: "%d inutes-may",
    hour: "about-hay an-hay hour-hay",
    hours: "about-hay %d hours-hay",
    day: "a-hay ay-day",
    days: "%d ays-day",
    month: "about-hay a-hay onth-may",
    months: "%d onths-may",
    year: "about-hay a-hay ear-yay",
    years: "%d years-yay"
  };
}

function loadRussian() {
  (function() {
    function numpf(n, f, s, t) {
      // f - 1, 21, 31, ...
      // s - 2-4, 22-24, 32-34 ...
      // t - 5-20, 25-30, ...
      var n10 = n % 10;
      if ( (n10 == 1) && ( (n == 1) || (n > 20) ) ) {
        return f;
      } else if ( (n10 > 1) && (n10 < 5) && ( (n > 20) || (n < 10) ) ) {
        return s;
      } else {
        return t;
      }
    }

    jQuery.timeago.settings.strings = {
      prefixAgo: null,
      prefixFromNow: "脩鈥∶惵得戔偓脨碌脨路",
      suffixAgo: "脨陆脨掳脨路脨掳脨麓",
      suffixFromNow: null,
      seconds: "脨录脨碌脨陆脩艗脩藛脨碌 脨录脨赂脨陆脩茠脩鈥毭戔€�",
      minute: "脨录脨赂脨陆脩茠脩鈥毭懫�",
      minutes: function(value) { return numpf(value, "%d 脨录脨赂脨陆脩茠脩鈥毭惵�", "%d 脨录脨赂脨陆脩茠脩鈥毭戔€�", "%d 脨录脨赂脨陆脩茠脩鈥�"); },
      hour: "脩鈥∶惵懊懧�",
      hours: function(value) { return numpf(value, "%d 脩鈥∶惵懊懧�", "%d 脩鈥∶惵懊懧伱惵�", "%d 脩鈥∶惵懊懧伱惵久惵�"); },
      day: "脨麓脨碌脨陆脩艗",
      days: function(value) { return numpf(value, "%d 脨麓脨碌脨陆脩艗", "%d 脨麓脨陆脩聫", "%d 脨麓脨陆脨碌脨鹿"); },
      month: "脨录脨碌脩聛脩聫脩鈥�",
      months: function(value) { return numpf(value, "%d 脨录脨碌脩聛脩聫脩鈥�", "%d 脨录脨碌脩聛脩聫脩鈥犆惵�", "%d 脨录脨碌脩聛脩聫脩鈥犆惵得惵�"); },
      year: "脨鲁脨戮脨麓",
      years: function(value) { return numpf(value, "%d 脨鲁脨戮脨麓", "%d 脨鲁脨戮脨麓脨掳", "%d 脨禄脨碌脩鈥�"); }
    };
  })();
}

function loadYoungOldYears() {
  jQuery.extend(jQuery.timeago.settings.strings, {
    years: function(value) { return (value < 21) ? "%d young years" : "%d old years"; }
  });
}