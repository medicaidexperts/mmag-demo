/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/about/index.html","c8f53fd1828064b6960f8108780ded1d"],["/assets/blog/health-care-whats-next.jpg","617f0f1fc1c97c04f97ffd09f426a499"],["/assets/css/jquery.accordion.css","dde66806cbb44c1de9307307be3e232d"],["/assets/css/style.css","e027f83a4be6a4f2aef0c57d79126f28"],["/assets/favicon/apple-touch-icon-114x114.png","b76675c87464662dc40ba2a73e1b819c"],["/assets/favicon/apple-touch-icon-120x120.png","04af5a12ca22253199fd9f7e5914028b"],["/assets/favicon/apple-touch-icon-144x144.png","a5b5b690b519a8622fa52b014ecb9772"],["/assets/favicon/apple-touch-icon-152x152.png","d703aa24fb9947ac6a3e96d196427277"],["/assets/favicon/apple-touch-icon-57x57.png","8a769643e4c152501dcffed8716b2f69"],["/assets/favicon/apple-touch-icon-60x60.png","4f363263a2b671d13971357a5385e489"],["/assets/favicon/apple-touch-icon-72x72.png","d53f6dc63b4b2ef3c00af0bdbf8e6406"],["/assets/favicon/apple-touch-icon-76x76.png","8ced836d8cabf1a2da6fa5a391bb8033"],["/assets/favicon/favicon-128.png","efe6d617dcd220af321abc46234172d1"],["/assets/favicon/favicon-16x16.png","b4d3f666c57ee4d30daa6d33650c6110"],["/assets/favicon/favicon-196x196.png","49d68c57207e71740164d5a72a345119"],["/assets/favicon/favicon-32x32.png","e74227ca87022049616a5bd51a668294"],["/assets/favicon/favicon-96x96.png","7e6bc4e12eeed4277e7ef89bfe64b45e"],["/assets/favicon/mstile-144x144.png","a5b5b690b519a8622fa52b014ecb9772"],["/assets/favicon/mstile-150x150.png","b11bb7fca5b557146d1159e913c3dc13"],["/assets/favicon/mstile-310x150.png","292261784b2ce7c016a1789e07a13178"],["/assets/favicon/mstile-310x310.png","36e5d1996dd19f01633828390749503c"],["/assets/favicon/mstile-70x70.png","efe6d617dcd220af321abc46234172d1"],["/assets/images/favicon.png","1e4b3eee55199cff4db9bd69b9db5f07"],["/assets/images/ginaandfamily.jpg","f0798ae3a3f422c35eab52e7b70f8269"],["/assets/images/logo-social.png","d34a88495bab1997d7405d58c3c859ce"],["/assets/images/logo.png","db8f7d2d0009b0eb113c68b4c9d38a55"],["/assets/images/main-banner.jpg","4b625bde21d6d074690fed93fd47ad42"],["/assets/images/map-large.png","338ac343dc79271714aac0d61b551f49"],["/assets/images/map-medium.png","f74857ce4fc07c8bef91a52a5c1accde"],["/assets/images/map-small.png","95de171a3d56ecca078cca9c404e895e"],["/assets/images/our-story-ginalisa.jpg","3de3abb98075f46274006d54e3776822"],["/assets/images/our-story-tara1.jpg","f6f73d53c2e22c79946fa003a83f2486"],["/assets/images/our-story-tara2.jpg","a9356bfc92e5cd40e3a1770e91d8edac"],["/assets/images/placeholder.png","0523b83973c21d52bf004b1ba60b4e7f"],["/assets/images/press/ah.png","4ef44f83e809d8a763dca3e2abd77024"],["/assets/images/press/c.png","2c5cec91617d1f7e7b9ace3a5b229609"],["/assets/images/press/cg.png","83d6c723a93708dead180d9d7265d7cd"],["/assets/images/press/dj.png","58cc76b30b7167ff8b6c6e65edab3dac"],["/assets/images/press/em.png","bd5b38369c6e7dd3a0a3776194885156"],["/assets/images/press/ewn.png","0428e01da0dc5cde7c2a9952b3ba8939"],["/assets/images/press/f.png","a4d6cc7a04f8b3c7cff3cb7e5d054e72"],["/assets/images/press/fhf.png","23b824e89f166a3f0eff13f55992ed31"],["/assets/images/press/hnd.png","db37349c5c969d2585f1cb386da603a1"],["/assets/images/press/l.png","6356e0f0ae822ca45a9b9ec4a2f9eebc"],["/assets/images/press/njsl.png","eb642aa4a8ff3ccecd027d6b255eca6c"],["/assets/images/press/npq.png","285472d969f624f3e629948599437654"],["/assets/images/press/ny.png","f11340dcaab09a335d5d341bfaa62b8f"],["/assets/images/press/nyp.png","75aa7c5ee4828a5e25f87566c8d51400"],["/assets/images/press/o2hd.jpg","7f4d760571b5b7ed9d7bb274b228e389"],["/assets/images/press/ov.png","885f3172aad182b4ab2262f627d19433"],["/assets/images/press/pmus.jpg","3560262a908a72f7cd0ea1927a78e50f"],["/assets/images/press/pn.png","961db165141c538975b1e32a0e208e3b"],["/assets/images/press/ql.png","b55b16f241dc5a927937bdd2cdd0cc59"],["/assets/images/press/ri.png","6b702afd225201ad8d6766b06bfdba5e"],["/assets/images/press/s.png","38bdcde0577c8adee0b5aad30b4b5788"],["/assets/images/press/tbl.png","d9c0a60263df47119f9a9736a129884c"],["/assets/images/press/tnw.png","f7253c500f1cbd1b4224c495f81b8c8c"],["/assets/images/press/tnyt.jpg","45d15c263127a20990d44a1a1c3f6e72"],["/assets/images/press/twpe.png","bf5e035cb06231af483c2ef29cf8b9ab"],["/assets/images/press/usn.png","3cb7656cb4b9e306719c946b552fc88b"],["/assets/images/press/usnw.jpg","0150ed4b71ced1e309c6fc848a52a450"],["/assets/images/service-ep.jpg","5f8bc051c7067c46bef225b26ed3be37"],["/assets/images/service-ha.jpg","6042ce5f26d12924bba7912a4a91a136"],["/assets/images/service-hse.jpg","52d51fcb2577758801f8e0749bc3462a"],["/assets/images/service-list-ep.jpg","e8ae77dcd798f6778130443f98a22d3d"],["/assets/images/service-list-ha.jpg","29a6e2e0b400140cd2cee56a3700310c"],["/assets/images/service-list-hse.jpg","e21b5ebacc4c195384684a6311651bbf"],["/assets/images/service-list-mo.jpg","fc2bdb791bcec35e1f4b941905cdb206"],["/assets/images/service-mo.jpg","a3791581efeda4c1ff6d3c3a1177f3a3"],["/assets/images/story-arthur.jpg","0036c32deaabc8182ce81d6c8d97e278"],["/assets/images/story-morton.jpg","2cab592d19860d735362ee8b4957d35f"],["/assets/images/story-others.jpg","d058cb562644c2d23bb6c02ed8762225"],["/assets/js/jquery-3.1.1.min.js","13062b7699b965d79cd46225ca0b1c14"],["/assets/js/jquery.accordion.js","4f2318f6e59574ff3e22916a9cf4e167"],["/assets/js/main.js","002c4c3e1aff9564dcfd2fb48622135d"],["/assets/js/sticky.js","755daa5dde80c627afc86f10885c3729"],["/assets/svg/cross.svg","d57b192acec35ddb0b9371df3f8d4e01"],["/assets/svg/logo.svg","5abd3a40e4a358fba46525986083b7be"],["/assets/svg/quiz-family-1.svg","0629ae5b297a957a34d20a52f392432c"],["/assets/svg/quiz-family-2-away.svg","7928e5e11468f551ca31ef354e2b6186"],["/assets/svg/quiz-family-2.svg","b9f4f2b2fcfdb0a978435f28f82eef2d"],["/assets/svg/quiz-family-3.svg","073537936f1b1ba2d2af1c11e68d512d"],["/assets/svg/quiz-flag.svg","8d06fa80a8e604d27330d3e0b10aca22"],["/assets/svg/quiz-grand.svg","f44b75bb8afb62bda0e2e88cd521ee1f"],["/assets/svg/quiz-money.svg","f3a78ec944e8daa3d36001d02c51a398"],["/assets/svg/quiz-result-fail-1.svg","ac5933b4625afa863be1d7a59536a704"],["/assets/svg/quiz-result-fail-2.svg","09690f4430d2df411b7fe8bf0d604bfd"],["/assets/svg/social/PNG/behance.png","e4a5f538ff91ae704194d6dc8f5f8e98"],["/assets/svg/social/PNG/dribbble.png","d16b720ae8c4e6b7bde78933a9ca5ad5"],["/assets/svg/social/PNG/facebook.png","46b3815e4ebb00dd775882599381397a"],["/assets/svg/social/PNG/linkedin.png","ca0adffe688416ca0fb431f56ff73faf"],["/assets/svg/social/PNG/twitter.png","cebb075b0ef10b9d438e5b2f265560e9"],["/assets/svg/social/PNG/youtube.png","5ad756636181228c7449f046a0de65ff"],["/assets/svg/social/SVG/behance.svg","6ba3dc0a6d891288068a96657f6cba35"],["/assets/svg/social/SVG/dribbble.svg","178ccd0569a303d7f06329ba5be852a9"],["/assets/svg/social/SVG/facebook.svg","65e424b9105d44b76afa7d3165346230"],["/assets/svg/social/SVG/linkedin.svg","c40c53cf50c2bd942d0e255fde5a0b25"],["/assets/svg/social/SVG/twitter.svg","c3b9f53d160ac64dbb6f3d497d88d6d3"],["/assets/svg/social/SVG/youtube.svg","90975babba0935301ccff4a3994b69d4"],["/assets/svg/social/demo-files/demo.css","48ef3e1429d241fdee6b4f07d9301507"],["/assets/svg/social/social-defs.svg","f3cf0933ad83d2524aaf83e3cb051c20"],["/assets/svg/social/style.css","7e167f9f8ae29a629c3d1771abb29e30"],["/assets/svg/social/svgxuse.js","4ba5707abc591cdac9742004ef6e2907"],["/assets/svg/tick.svg","941f6f821d04b2a3de53cc9b4e01b235"],["/contact/index.html","b047a278103f5b60c4696f3aa495c649"],["/dev-blog/index.html","8b6a391f94b8694b5e0443b6add8edc2"],["/events/index.html","0fc7d6a8ddbf03676d9db3d7e52a6763"],["/faqs/index.html","24b3393cfc75971152a3d44b11c65c19"],["/ghost/casper/assets/css/screen.css","c81591c70a2a3f42a7fb16a40cd36e14"],["/ghost/casper/assets/js/index.js","783f91c6803c203b713603ecb8edb0a2"],["/ghost/casper/assets/js/jquery.fitvids.js","3d3a8c0cfb6264d7790fa45022d273a8"],["/index.html","8fbfa737cffe47be45af583922a655b2"],["/our-services/estate-planning/index.html","40c3e7b78ca6de05e5a1dfa23846cc88"],["/our-services/healthcare-advisors/index.html","ee16531874c7bce6cdca98b1ec728d01"],["/our-services/homecare-services-eligibility/index.html","6685d0c29c30a600fa01080479ee8fc1"],["/our-services/index.html","b3f0b136c48c5d2d38f59a72b22e1663"],["/our-services/medicare-options/index.html","64d3f857a2ecb6e14635ff55a400e49b"],["/our-story/ginalisa/index.html","6dc0e9f742a65782495481193eb0f323"],["/press/index.html","645a3ca7f4774dd639a780545cacd592"],["/quiz/index.html","71685f6c5e32a98da24744c1dd5b56eb"],["/quiz/may-qualify-for-medicaid/index.html","2530b8e0895c05b92684a48c892043e6"],["/quiz/not-qualified-for-medicaid/index.html","2404d1e91131ed7f94ce74355d23d427"],["/quiz/qualified-for-medicaid/index.html","13666daa3e24f5eeec3771ac2c47ef50"],["/sw-precache-config.js","472aaa15435b63cc4164ed92d41448b4"],["/testimonials/index.html","d99195a13e3a22d98ab0889559dee707"],["/thank-you/index.html","67027e168d7e4b0be6d40bad4f6b7b10"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {


    if (event.request.url.indexOf('/blog') != -1) {
      console.log("Blog url, bypassing sw");
      // Blog url, hence bypass sw
      return fetch(event.request);
    }


    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







