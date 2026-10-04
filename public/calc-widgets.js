/*
 * Small calculators for the two static guide pages
 * (bmi-calculator-for-indians.html, protein-for-vegetarians-india.html).
 *
 * It is a separate file because the site's Content-Security-Policy only allows
 * scripts from the same origin plus one hashed inline script, so the pages
 * cannot carry their own inline <script>. Everything runs in the browser;
 * nothing is sent anywhere.
 *
 * The cutoffs match the table on the BMI page: Indian scale (2009 consensus
 * statement) overweight from 23 and obese from 25, against the global WHO
 * scale's 25 and 30. The protein ranges match the page's text: 0.8 g/kg for a
 * sedentary adult, 1.2 to 2.0 g/kg when training (ACSM).
 */
(function () {
  'use strict';

  function bmiResult(heightCm, weightKg) {
    var m = heightCm / 100;
    var bmi = weightKg / (m * m);
    return {
      bmi: bmi,
      indian: bmi < 18.5 ? 'Underweight' : bmi < 23 ? 'Normal' : bmi < 25 ? 'Overweight' : 'Obese',
      who: bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese',
      healthyMin: 18.5 * m * m,
      healthyMax: 22.9 * m * m,
    };
  }

  function proteinRange(weightKg, perKg) {
    var parts = String(perKg).split('-');
    var lo = parseFloat(parts[0]);
    var hi = parts.length > 1 ? parseFloat(parts[1]) : lo;
    return { low: weightKg * lo, high: weightKg * hi };
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { bmiResult: bmiResult, proteinRange: proteinRange };
    return;
  }

  var $ = function (id) { return document.getElementById(id); };
  var r0 = function (n) { return Math.round(n); };
  var r1 = function (n) { return (Math.round(n * 10) / 10).toFixed(1); };

  var bmiForm = $('bmi-form');
  if (bmiForm) {
    bmiForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var h = parseFloat($('bmi-h').value);
      var w = parseFloat($('bmi-w').value);
      var out = $('bmi-out');
      if (!(h >= 100 && h <= 250) || !(w >= 25 && w <= 300)) {
        out.textContent = 'Enter a height between 100 and 250 cm and a weight between 25 and 300 kg.';
        return;
      }
      var r = bmiResult(h, w);
      out.innerHTML =
        '<strong>BMI ' + r1(r.bmi) + '</strong>: <strong>' + r.indian + '</strong> on the Indian scale' +
        (r.indian !== r.who ? ' (the global WHO scale would call it ' + r.who + ')' : ' (the same on the global WHO scale)') +
        '.<br>Healthy weight for your height on the Indian scale: <strong>' +
        r1(r.healthyMin) + ' to ' + r1(r.healthyMax) + ' kg</strong>.';
    });
  }

  var proteinForm = $('protein-form');
  if (proteinForm) {
    proteinForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var w = parseFloat($('protein-w').value);
      var out = $('protein-out');
      if (!(w >= 25 && w <= 300)) {
        out.textContent = 'Enter a weight between 25 and 300 kg.';
        return;
      }
      var r = proteinRange(w, $('protein-a').value);
      var same = r0(r.low) === r0(r.high);
      out.innerHTML =
        'Your daily protein target: <strong>' + (same ? r0(r.low) : r0(r.low) + ' to ' + r0(r.high)) + ' g</strong>.' +
        '<br>Split over four meals, that is about ' + (same ? r0(r.low / 4) : r0(r.low / 4) + ' to ' + r0(r.high / 4)) + ' g per meal.';
    });
  }
})();
