/*
MOOSA_CMO_UTM_SIGNUP_PASSTHROUGH_ACTIVE_20260904
Forwards the visitor's own utm_source/utm_medium/utm_campaign/utm_content/
utm_term query params (whatever they actually arrived with -- never a
fabricated value) onto every outbound "Start Your Free Trial" signup link,
so app.chargeguard.net's signup flow can attribute a signup back to the
real marketing touch that drove it. No-op (early return) when the visitor
arrived with no utm_ params at all, so direct/organic traffic is unaffected.
*/
(function () {
  var params = new URLSearchParams(window.location.search);
  var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var utmParams = new URLSearchParams();
  utmKeys.forEach(function (k) {
    var v = params.get(k);
    if (v) utmParams.set(k, v);
  });
  if (Array.from(utmParams.keys()).length === 0) return;

  document.querySelectorAll('a[href^="https://app.chargeguard.net/signup"]').forEach(function (a) {
    try {
      var url = new URL(a.href);
      utmParams.forEach(function (v, k) { url.searchParams.set(k, v); });
      a.href = url.toString();
    } catch (e) { /* leave link untouched on any parse failure */ }
  });
})();
