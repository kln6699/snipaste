Zepto(function ($) {

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    function setCookie(name, value, props) {
        props = props || {}
        var exp = props.expires
        if (typeof exp == "number" && exp) {
            var d = new Date()
            d.setTime(d.getTime() + exp * 1000)
            exp = props.expires = d
        }
        if (exp && exp.toUTCString) { props.expires = exp.toUTCString() }
        value = encodeURIComponent(value)
        var updatedCookie = name + "=" + value
        for (var propName in props) {
            updatedCookie += "; " + propName
            var propValue = props[propName]
            if (propValue !== true) { updatedCookie += "=" + propValue }
        }
        document.cookie = updatedCookie

    }

    function deleteCookie(name) {
        setCookie(name, null, { expires: -1 })
    }

    function parseDownUrlO(url, ver, bdv, bdvsp) {
        if (!bdvsp) {
            bdvsp = '_';
        }
        bdvsp = '_';

        var extension = url.split('.');
        extension = extension[extension.length - 1];

        url = url.replace(/\{ver\}/g, ver);
        if (location.href.match(/bd_vid=([^&]+)/i)) {
            var bdVid = location.href.match(/bd_vid=([^&]+)/i)[1];
            if (bdv && bdVid) {
                url = url.replace(new RegExp('.' + extension + '$'), bdvsp + bdVid + "." + extension)
            }
        } else if (location.href.match(/sourceid=([^&]+)/i)) {
            var sourceid = location.href.match(/sourceid=([^&]+)/i)[1];
            if (bdv && sourceid) {
                url = url.replace(new RegExp('.' + extension + '$'), bdvsp + sourceid + "." + extension)
            }
        } else if (location.href.match(/qhclickid=([^&]+)/i)) {
            var qhclickid = location.href.match(/qhclickid=([^&]+)/i)[1];
            if (bdv && qhclickid) {
                url = url.replace(new RegExp('.' + extension + '$'), bdvsp + qhclickid + "." + extension)
            }
        }
        return url;

    }
    function parseDownUrl(url, ver, bdv, bdvsp) {
        if (!bdvsp) {
            bdvsp = '@';
        }
        url = url.replace(/\{ver\}/g, ver);
        if (location.href.match(/bd_vid=([^&]+)/i)) {
            var bdVid = location.href.match(/bd_vid=([^&]+)/i)[1];
            if (bdv && bdVid) {
                url = url + "&host=download1.pdf00.com&suffix=" + encodeURIComponent(bdvsp) + bdVid;
            }
        } else if (location.href.match(/sourceid=([^&]+)/i)) {
            var sourceid = location.href.match(/sourceid=([^&]+)/i)[1];
            if (bdv && sourceid) {
                url = url + "&host=download1.pdf00.com&suffix=" + encodeURIComponent(bdvsp) + sourceid;
            }
        } else if (location.href.match(/qhclickid=([^&]+)/i)) {
            var qhclickid = location.href.match(/qhclickid=([^&]+)/i)[1];
            if (bdv && qhclickid) {
                url = url + "&host=download1.pdf00.com&suffix=" + encodeURIComponent(bdvsp) + qhclickid;
            }
        }
        return url;
    }
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid.replace(/\-/g, '');
    }

    var uid = getCookie("_S_FF_UID");
    if (!uid || uid == undefined) {
        uid = generateUUID();
    }
    setCookie("_S_FF_UID", uid, {
        expires: 86400 * 2
    });

    var ver = '';
    if (location.href.match(/ver=[^&]+/i)) {
        ver = location.href.match(/ver=([^&]+)/i)[1];
    }
    var link = '1';
    if (location.href.match(/link=[^&]+/i)) {
        link = location.href.match(/link=([^&]+)/i)[1];
    }

    var dsp = '//tj.pdf00.cn/api/site/soft/dsp/{s1}/{s2}/{s3}'.replace('{s1}', PAGEINFO.s1).replace('{s2}', PAGEINFO.s2).replace('{s3}', PAGEINFO.s3);
    $.get(dsp, {
        'uid': uid,
        'ver': ver,
        'r': location.href,
        'rr': document.referrer,
        '_': (new Date().getTime() + '' + parseInt(Math.random() * 100000))
    }, 'jsonp');

    var clk = '//tj.pdf00.cn/api/site/soft/clk/{s1}/{s2}/{s3}'.replace('{s1}', PAGEINFO.s1).replace('{s2}', PAGEINFO.s2).replace('{s3}', PAGEINFO.s3);
    $(".js-down").click(function () {
        PAGEINFO.mv = PAGEINFO.mv ? PAGEINFO.mv : 0;
        if ((/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || $(this).hasClass('js-down-ios')) && ('iu' in PAGEINFO) && PAGEINFO.iu) {
            // ios
            var urlVer = ver;
            if (PAGEINFO.mv > 0 && ver > PAGEINFO.mv > 0) {
                urlVer = PAGEINFO.mv;
            }
            if (!urlVer) {
                urlVer = '';
            }
            if (location.href.match(/origin\=1/) || ('origin' in PAGEINFO && PAGEINFO.origin)) {
                $(this).attr('href', parseDownUrlO(PAGEINFO.oiu, urlVer, PAGEINFO.bdv, PAGEINFO.bdvsp));
            } else {
                $(this).attr('href', parseDownUrl(PAGEINFO.iu, urlVer, PAGEINFO.bdv, PAGEINFO.bdvsp));
            }
        } else {
            if (('u' in PAGEINFO) && PAGEINFO.u) {
                var urlVer = ver;
                if (PAGEINFO.mv > 0 && ver > PAGEINFO.mv > 0) {
                    urlVer = PAGEINFO.mv;
                }
                if (urlVer) {
                    if (location.href.match(/origin\=1/) || ('origin' in PAGEINFO && PAGEINFO.origin)) {
                        $(this).attr('href', parseDownUrlO(PAGEINFO.ou, urlVer, PAGEINFO.bdv, PAGEINFO.bdvsp));
                    } else {
                        $(this).attr('href', parseDownUrl(PAGEINFO.u, urlVer, PAGEINFO.bdv, PAGEINFO.bdvsp));
                    }
                }
            }
        }

        $.get(clk, {
            'uid': uid,
            'ver': ver,
            'r': location.href,
            'rr': document.referrer,
            '_': (new Date().getTime() + '' + parseInt(Math.random() * 100000))
        }, 'jsonp');
        return true;
    });

    $(".js-down").each(function () {
        PAGEINFO.mv = PAGEINFO.mv ? PAGEINFO.mv : 0;
        if ((/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || $(this).hasClass('js-down-ios')) && ('iu' in PAGEINFO) && PAGEINFO.iu) {
            // ios
            var urlVer = ver;
            if (PAGEINFO.mv > 0 && ver > PAGEINFO.mv > 0) {
                urlVer = PAGEINFO.mv;
            }
            if (!urlVer) {
                urlVer = '';
            }
            if (location.href.match(/origin\=1/) || ('origin' in PAGEINFO && PAGEINFO.origin)) {
                $(this).attr('href', parseDownUrlO(PAGEINFO.oiu, urlVer, PAGEINFO.bdv, PAGEINFO.bdvsp));
            } else {
                $(this).attr('href', parseDownUrl(PAGEINFO.iu, urlVer, PAGEINFO.bdv, PAGEINFO.bdvsp));
            }
        } else {
            if (('u' in PAGEINFO) && PAGEINFO.u) {
                var urlVer = ver;
                if (PAGEINFO.mv > 0 && ver > PAGEINFO.mv > 0) {
                    urlVer = PAGEINFO.mv;
                }
                if (urlVer) {
                    if (location.href.match(/origin\=1/) || ('origin' in PAGEINFO && PAGEINFO.origin)) {
                        $(this).attr('href', parseDownUrlO(PAGEINFO.ou, urlVer, PAGEINFO.bdv, PAGEINFO.bdvsp));
                    } else {
                        $(this).attr('href', parseDownUrl(PAGEINFO.u, urlVer, PAGEINFO.bdv, PAGEINFO.bdvsp));
                    }
                }
            }
        }
    });

});
if (('jQuery' in window)) {
    $ = jQuery;
}