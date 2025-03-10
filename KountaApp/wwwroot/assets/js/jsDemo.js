﻿/* pwstrength-bootstrap 2015-10-27 - GPLv3 & MIT License */

! function (a) {
    var b = {};
    try {
        if (!a && module && module.exports) {
            var a = require("jquery"),
                c = require("jsdom").jsdom;
            a = a(c().parentWindow)
        }
    } catch (d) { } ! function (a, b) {
        "use strict";
        var c = {};
        b.forbiddenSequences = ["0123456789", "abcdefghijklmnopqrstuvwxyz", "qwertyuiop", "asdfghjkl", "zxcvbnm", "!@#$%^&*()_+"], c.wordNotEmail = function (a, b, c) {
            return b.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i) ? c : 0
        }, c.wordLength = function (a, b, c) {
            var d = b.length,
                e = Math.pow(d, a.rules.raisePower);
            return d < a.common.minChar && (e += c), e
        }, c.wordSimilarToUsername = function (b, c, d) {
            var e = a(b.common.usernameField).val();
            return e && c.toLowerCase().match(e.replace(/[\-\[\]\/\{\}\(\)\*\+\=\?\:\.\\\^\$\|\!\,]/g, "\\$&").toLowerCase()) ? d : 0
        }, c.wordTwoCharacterClasses = function (a, b, c) {
            return b.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) || b.match(/([a-zA-Z])/) && b.match(/([0-9])/) || b.match(/(.[!,@,#,$,%,\^,&,*,?,_,~])/) && b.match(/[a-zA-Z0-9_]/) ? c : 0
        }, c.wordRepetitions = function (a, b, c) {
            return b.match(/(.)\1\1/) ? c : 0
        }, c.wordSequences = function (c, d, e) {
            var f, g = !1;
            return d.length > 2 && (a.each(b.forbiddenSequences, function (b, c) {
                if (!g) {
                    var e = [c, c.split("").reverse().join("")];
                    a.each(e, function (a, b) {
                        for (f = 0; f < d.length - 2; f += 1) b.indexOf(d.toLowerCase().substring(f, f + 3)) > -1 && (g = !0)
                    })
                }
            }), g) ? e : 0
        }, c.wordLowercase = function (a, b, c) {
            return b.match(/[a-z]/) && c
        }, c.wordUppercase = function (a, b, c) {
            return b.match(/[A-Z]/) && c
        }, c.wordOneNumber = function (a, b, c) {
            return b.match(/\d+/) && c
        }, c.wordThreeNumbers = function (a, b, c) {
            return b.match(/(.*[0-9].*[0-9].*[0-9])/) && c
        }, c.wordOneSpecialChar = function (a, b, c) {
            return b.match(/[!,@,#,$,%,\^,&,*,?,_,~]/) && c
        }, c.wordTwoSpecialChar = function (a, b, c) {
            return b.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/) && c
        }, c.wordUpperLowerCombo = function (a, b, c) {
            return b.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && c
        }, c.wordLetterNumberCombo = function (a, b, c) {
            return b.match(/([a-zA-Z])/) && b.match(/([0-9])/) && c
        }, c.wordLetterNumberCharCombo = function (a, b, c) {
            return b.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/) && c
        }, b.validation = c, b.executeRules = function (c, d) {
            var e = 0;
            return a.each(c.rules.activated, function (f, g) {
                if (g) {
                    var h, i, j = c.rules.scores[f],
                        k = b.validation[f];
                    a.isFunction(k) || (k = c.rules.extra[f]), a.isFunction(k) && (h = k(c, d, j), h && (e += h), (0 > h || !a.isNumeric(h) && !h) && (i = c.ui.spanError(c, f), i.length > 0 && c.instances.errors.push(i)))
                }
            }), e
        }
    }(a, b);
    try {
        module && module.exports && (module.exports = b)
    } catch (d) { }
    var e = {};
    e.common = {}, e.common.minChar = 6, e.common.usernameField = "#username", e.common.userInputs = [], e.common.onLoad = void 0, e.common.onKeyUp = void 0, e.common.zxcvbn = !1, e.common.zxcvbnTerms = [], e.common.debug = !1, e.rules = {}, e.rules.extra = {}, e.rules.scores = {
        wordNotEmail: -100,
        wordLength: -50,
        wordSimilarToUsername: -100,
        wordSequences: -20,
        wordTwoCharacterClasses: 2,
        wordRepetitions: -25,
        wordLowercase: 1,
        wordUppercase: 3,
        wordOneNumber: 3,
        wordThreeNumbers: 5,
        wordOneSpecialChar: 3,
        wordTwoSpecialChar: 5,
        wordUpperLowerCombo: 2,
        wordLetterNumberCombo: 2,
        wordLetterNumberCharCombo: 2
    }, e.rules.activated = {
        wordNotEmail: !0,
        wordLength: !0,
        wordSimilarToUsername: !0,
        wordSequences: !0,
        wordTwoCharacterClasses: !1,
        wordRepetitions: !1,
        wordLowercase: !0,
        wordUppercase: !0,
        wordOneNumber: !0,
        wordThreeNumbers: !0,
        wordOneSpecialChar: !0,
        wordTwoSpecialChar: !0,
        wordUpperLowerCombo: !0,
        wordLetterNumberCombo: !0,
        wordLetterNumberCharCombo: !0
    }, e.rules.raisePower = 1.4, e.ui = {}, e.ui.bootstrap2 = !1, e.ui.bootstrap4 = !1, e.ui.colorClasses = ["danger", "warning", "success"], e.ui.showProgressBar = !0, e.ui.showPopover = !1, e.ui.popoverPlacement = "bottom", e.ui.showStatus = !1, e.ui.spanError = function (a, b) {
        "use strict";
        var c = a.ui.errorMessages[b];
        return c ? '<span style="color: #d52929">' + c + "</span>" : ""
    }, e.ui.popoverError = function (b) {
        "use strict";
        var c = "<div>Errors:<ul class='error-list' style='margin-bottom: 0;'>";
        return a.each(b, function (a, b) {
            c += "<li>" + b + "</li>"
        }), c += "</ul></div>"
    }, e.ui.errorMessages = {
        wordLength: "Your password is too short",
        wordNotEmail: "Do not use your email as your password",
        wordSimilarToUsername: "Your password cannot contain your username",
        wordTwoCharacterClasses: "Use different character classes",
        wordRepetitions: "Too many repetitions",
        wordSequences: "Your password contains sequences"
    }, e.ui.verdicts = ["Weak", "Normal", "Medium", "Strong", "Very Strong"], e.ui.showVerdicts = !0, e.ui.showVerdictsInsideProgressBar = !1, e.ui.useVerdictCssClass = !1, e.ui.showErrors = !1, e.ui.container = void 0, e.ui.viewports = {
        progress: void 0,
        verdict: void 0,
        errors: void 0
    }, e.ui.scores = [14, 26, 38, 50];
    var f = {};
    ! function (a, b) {
        "use strict";
        var c = ["error", "warning", "success"];
        b.getContainer = function (b, c) {
            var d;
            return d = a(b.ui.container), d && 1 === d.length || (d = c.parent()), d
        }, b.findElement = function (a, b, c) {
            return b ? a.find(b).find(c) : a.find(c)
        }, b.getUIElements = function (a, c) {
            var d, e, f;
            return a.instances.viewports ? a.instances.viewports : (d = b.getContainer(a, c), f = {}, e = a.ui.bootstrap4 ? "progress.progress" : "div.progress", f.$progressbar = b.findElement(d, a.ui.viewports.progress, e), a.ui.showVerdictsInsideProgressBar && (f.$verdict = f.$progressbar.find("span.password-verdict")), a.ui.showPopover || (a.ui.showVerdictsInsideProgressBar || (f.$verdict = b.findElement(d, a.ui.viewports.verdict, "span.password-verdict")), f.$errors = b.findElement(d, a.ui.viewports.errors, "ul.error-list")), a.instances.viewports = f, f)
        }, b.initProgressBar = function (c, d) {
            var e = b.getContainer(c, d),
                f = "<div class='progress'><div class='";
            c.ui.bootstrap2 || c.ui.bootstrap4 || (f += "progress-"), f += "bar'>", c.ui.bootstrap4 && (f = "<progress class='progress' value='0' max='100'>"), c.ui.showVerdictsInsideProgressBar && (f += "<span class='password-verdict'></span>"), f += c.ui.bootstrap4 ? "</progress>" : "</div></div>", c.ui.viewports.progress ? e.find(c.ui.viewports.progress).append(f) : a(f).insertAfter(d)
        }, b.initHelper = function (c, d, e, f) {
            var g = b.getContainer(c, d);
            f ? g.find(f).append(e) : a(e).insertAfter(d)
        }, b.initVerdict = function (a, c) {
            b.initHelper(a, c, "<span class='password-verdict'></span>", a.ui.viewports.verdict)
        }, b.initErrorList = function (a, c) {
            b.initHelper(a, c, "<ul class='error-list'></ul>", a.ui.viewports.errors)
        }, b.initPopover = function (a, b) {
            b.popover("destroy"), b.popover({
                html: !0,
                placement: a.ui.popoverPlacement,
                trigger: "manual",
                content: " "
            })
        }, b.initUI = function (a, c) {
            a.ui.showPopover ? b.initPopover(a, c) : (a.ui.showErrors && b.initErrorList(a, c), a.ui.showVerdicts && !a.ui.showVerdictsInsideProgressBar && b.initVerdict(a, c)), a.ui.showProgressBar && b.initProgressBar(a, c)
        }, b.updateProgressBar = function (c, d, e, f) {
            var g = b.getUIElements(c, d).$progressbar,
                h = g.find(".progress-bar"),
                i = "progress-";
            c.ui.bootstrap2 && (h = g.find(".bar"), i = ""), a.each(c.ui.colorClasses, function (a, b) {
                c.ui.bootstrap4 ? g.removeClass(i + b) : h.removeClass(i + "bar-" + b)
            }), c.ui.bootstrap4 ? (g.addClass(i + c.ui.colorClasses[e]), g.val(f)) : (h.addClass(i + "bar-" + c.ui.colorClasses[e]), h.css("width", f + "%"))
        }, b.updateVerdict = function (a, c, d, e) {
            var f = b.getUIElements(a, c).$verdict;
            f.removeClass(a.ui.colorClasses.join(" ")), d > -1 && f.addClass(a.ui.colorClasses[d]), f.html(e)
        }, b.updateErrors = function (c, d) {
            var e = b.getUIElements(c, d).$errors,
                f = "";
            a.each(c.instances.errors, function (a, b) {
                f += "<li>" + b + "</li>"
            }), e.html(f)
        }, b.updatePopover = function (a, b, c) {
            var d = b.data("bs.popover"),
                e = "",
                f = !0;
            return a.ui.showVerdicts && !a.ui.showVerdictsInsideProgressBar && c.length > 0 && (e = "<h5><span class='password-verdict'>" + c + "</span></h5>", f = !1), a.ui.showErrors && (a.instances.errors.length > 0 && (f = !1), e += a.ui.popoverError(a.instances.errors)), f ? void b.popover("hide") : (a.ui.bootstrap2 && (d = b.data("popover")), void (d.$arrow && d.$arrow.parents("body").length > 0 ? b.find("+ .popover .popover-content").html(e) : (d.options.content = e, b.popover("show"))))
        }, b.updateFieldStatus = function (b, d, e) {
            var f = b.ui.bootstrap2 ? ".control-group" : ".form-group",
                g = d.parents(f).first();
            a.each(c, function (a, c) {
                b.ui.bootstrap2 || (c = "has-" + c), g.removeClass(c)
            }), e = c[e], b.ui.bootstrap2 || (e = "has-" + e), g.addClass(e)
        }, b.percentage = function (a, b) {
            var c = Math.floor(100 * a / b);
            return c = 0 >= c ? 1 : c, c = c > 100 ? 100 : c
        }, b.getVerdictAndCssClass = function (a, b) {
            var c, d, e;
            return 0 >= b ? (c = 0, e = -1, d = a.ui.verdicts[0]) : b < a.ui.scores[0] ? (c = 0, e = 0, d = a.ui.verdicts[0]) : b < a.ui.scores[1] ? (c = 0, e = 1, d = a.ui.verdicts[1]) : b < a.ui.scores[2] ? (c = 1, e = 2, d = a.ui.verdicts[2]) : b < a.ui.scores[3] ? (c = 1, e = 3, d = a.ui.verdicts[3]) : (c = 2, e = 4, d = a.ui.verdicts[4]), [d, c, e]
        }, b.updateUI = function (a, c, d) {
            var e, f, g, h;
            e = b.getVerdictAndCssClass(a, d), g = 0 === d ? "" : e[0], e = e[1], h = a.ui.useVerdictCssClass ? e : -1, a.ui.showProgressBar && (f = b.percentage(d, a.ui.scores[3]), b.updateProgressBar(a, c, e, f), a.ui.showVerdictsInsideProgressBar && b.updateVerdict(a, c, h, g)), a.ui.showStatus && b.updateFieldStatus(a, c, e), a.ui.showPopover ? b.updatePopover(a, c, g) : (a.ui.showVerdicts && !a.ui.showVerdictsInsideProgressBar && b.updateVerdict(a, c, h, g), a.ui.showErrors && b.updateErrors(a, c))
        }
    }(a, f);
    var g = {};
    ! function (a, c) {
        "use strict";
        var d, g;
        d = function (c) {
            var d, e, g, h, i = a(c.target),
                j = i.data("pwstrength-bootstrap"),
                k = i.val();
            void 0 !== j && (j.instances.errors = [], 0 === k.length ? h = 0 : j.common.zxcvbn ? (d = [], a.each(j.common.userInputs.concat([j.common.usernameField]), function (b, c) {
                var e = a(c).val();
                e && d.push(e)
            }), d = d.concat(j.common.zxcvbnTerms), h = zxcvbn(k, d).entropy) : h = b.executeRules(j, k), f.updateUI(j, i, h), e = f.getVerdictAndCssClass(j, h), g = e[2], e = e[0], j.common.debug && console.log(h + " - " + e), a.isFunction(j.common.onKeyUp) && j.common.onKeyUp(c, {
                score: h,
                verdictText: e,
                verdictLevel: g
            }))
        }, c.init = function (b) {
            return this.each(function (c, g) {
                var h = a.extend(!0, {}, e),
                    i = a.extend(!0, h, b),
                    j = a(g);
                i.instances = {}, j.data("pwstrength-bootstrap", i), j.on("keyup", d), j.on("change", d), j.on("paste", d), f.initUI(i, j), a.trim(j.val()) && j.trigger("keyup"), a.isFunction(i.common.onLoad) && i.common.onLoad()
            }), this
        }, c.destroy = function () {
            this.each(function (b, c) {
                var d = a(c),
                    e = d.data("pwstrength-bootstrap"),
                    g = f.getUIElements(e, d);
                g.$progressbar.remove(), g.$verdict.remove(), g.$errors.remove(), d.removeData("pwstrength-bootstrap")
            })
        }, c.forceUpdate = function () {
            this.each(function (a, b) {
                var c = {
                    target: b
                };
                d(c)
            })
        }, c.addRule = function (b, c, d, e) {
            this.each(function (f, g) {
                var h = a(g).data("pwstrength-bootstrap");
                h.rules.activated[b] = e, h.rules.scores[b] = d, h.rules.extra[b] = c
            })
        }, g = function (b, c, d) {
            this.each(function (e, f) {
                a(f).data("pwstrength-bootstrap").rules[c][b] = d
            })
        }, c.changeScore = function (a, b) {
            g.call(this, a, "scores", b)
        }, c.ruleActive = function (a, b) {
            g.call(this, a, "activated", b)
        }, a.fn.pwstrength = function (b) {
            var d;
            return c[b] ? d = c[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? a.error("Method " + b + " does not exist on jQuery.pwstrength-bootstrap") : d = c.init.apply(this, arguments), d
        }
    }(a, g)
}(jQuery);
//# sourceMappingURL=pwstrength-bootstrap-1.2.9.min.map

/***********************************
 *
 *
 **********************************/

jQuery(document).ready(function () {
    "use strict";

    var options = {
        common: {
            debug: true,
            minChar: 6,
            onLoad: function () {
                $('#messages').text('');
            }
        },
        rules: {
            activated: {
                wordNotEmail: true,
                wordLength: true,
                wordSimilarToUsername: true,
                wordSequences: true,
                wordTwoCharacterClasses: false,
                wordRepetitions: false,
                wordLowercase: true,
                wordUppercase: true,
                wordOneNumber: true,
                wordThreeNumbers: true,
                wordOneSpecialChar: true,
                wordTwoSpecialChar: true,
                wordUpperLowerCombo: true,
                wordLetterNumberCombo: true,
                wordLetterNumberCharCombo: true
            },
            raise: 1.4,
            scores: {
                wordNotEmail: -100,
                wordLength: -50,
                wordSimilarToUsername: -100,
                wordSequences: -50,
                wordTwoCharacterClasses: 2,
                wordRepetitions: -25,
                wordLowercase: 1,
                wordUppercase: 3,
                wordOneNumber: 3,
                wordThreeNumbers: 5,
                wordOneSpecialChar: 3,
                wordTwoSpecialChar: 5,
                wordUpperLowerCombo: 2,
                wordLetterNumberCombo: 2,
                wordLetterNumberCharCombo: 2
            }
        },
        ui: {
            scores: [17, 26, 40, 50],
            container: "#pwd-container",
            verdicts: [
                "<span class='fa fa-exclamation-triangle'></span> Weak",
                "<span class='fa fa-exclamation-triangle'></span> Normal",
                "Medium",
                "<span class='fa fa-thumbs-up'></span> Strong",
                "<span class='fa fa-thumbs-up'></span> Very Strong"
            ],
            showVerdictsInsideProgressBar: true,
            viewports: {
                progress: ".pwstrength_viewport_progress"
            }
        }
    };

    $(':password').pwstrength(options);
});