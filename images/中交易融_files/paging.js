function paging() {
    this.page = 0, this.span, this.maxSize, this.td
}
paging.prototype = {
    init: function (t) {
        for (var e = this.body.childNodes, i = e.length - 1; i >= 0; i--)this.body.removeChild(e[i]);
        this.maxSize = Math.ceil(this.datas.length / this.pageSize);
        var s = document.createElement("table");
        this.td = new Array, this.span = new Array;
        var n = new Array, a = document.createElement("tr"), h = new Array, d = new Array;
        if (void 0 == t) {
            for (var r = 0; r < this.feildsName.length; r++)h[r] = document.createElement("td"), d[r] = document.createElement("span"), d[r].innerHTML = this.feildsName[r], h[r].appendChild(d[r]), a.appendChild(h[r]);
            s.appendChild(a)
        }
        for (var r = 0; r < this.pageSize && r < this.datas.length; r++) {
            n[r] = document.createElement("tr"), this.td[r] = new Array, this.span[r] = new Array;
            for (var o = 0; o < this.feildsName.length; o++)this.td[r][o] = document.createElement("td"), this.span[r][o] = document.createElement("div"), this.span[r][o].index = r, void 0 == this.datas[r][this.feilds[o]] && "edit" == this.feilds[o] ? this.span[r][o].innerHTML = "编辑" : this.span[r][o].innerHTML = this.datas[r][this.feilds[o]], this.td[r][o].appendChild(this.span[r][o]), n[r].appendChild(this.td[r][o]);
            s.appendChild(n[r])
        }
        for (var r = this.pageSize; r < this.datas.length; r++) {
            this.span[r] = new Array;
            for (var o = 0; o < this.feildsName.length; o++)this.span[r][o] = document.createElement("div"), this.span[r][o].index = r, void 0 == this.datas[r][this.feilds[o]] && "edit" == this.feilds[o] ? this.span[r][o].innerHTML = "编辑" : this.span[r][o].innerHTML = this.datas[r][this.feilds[o]]
        }
        this.body.appendChild(s), this.change()
    }, homePage: function () {
        this.page = 0, this.change(), this.getPageInfo()
    }, lastPage: function () {
        return this.page >= 1 ? (this.page = this.page - 1, this.change(), this.getPageInfo(), void 0) : !1
    }, nextPage: function () {
        return this.page <= this.maxSize - 2 ? (this.page = parseInt(this.page) + 1, this.change(), this.getPageInfo(), void 0) : !1
    }, skipPage: function (t) {
        return this.page = t, this.page >= 0 && this.page <= this.maxSize ? (this.change(), void this.getPageInfo()) : !1
    }, change: function () {
    }, getPageInfo: function () {
        for (var t = this.page * this.pageSize, e = 0; e < this.pageSize; t++, e++)for (var i = 0; i < this.feilds.length; i++) {
            this.td[e][i].style.visibility = "visible";
            for (var s = this.td[e][i].childNodes, n = s.length - 1; n >= 0; n--)this.td[e][i].removeChild(s[n]);
            t < this.datas.length ? this.td[e][i].appendChild(this.span[t][i]) : this.td[e][i].style.visibility = "hidden "
        }
    }, setDataSourse: function (t) {
        this.datas = t
    }, getDataSourse: function () {
        return this.datas
    }, setPageSize: function (t) {
        this.pageSize = t
    }, getPageSize: function () {
        return this.pageSize
    }, setParentDiv: function (t) {
        this.body = t
    }, setFeilds: function (t) {
        this.feilds = t
    }, getFeilds: function () {
        return this.feilds
    }, setFeildsName: function (t) {
        this.feildsName = t
    }, getFeildsName: function () {
        return this.feildsName
    }, setChangeEvent: function (t) {
        this.change = t
    }, getCurrentPageNum: function () {
        return this.page
    }, modifyField: function (t, e, i, s) {
        if ("template" == i)this.span[s][t].innerHTML = e; else for (var n = 0; n < this.span.length; n++) {
            var a = this.span[n][t].innerHTML;
            i ? this.span[n][t].innerHTML = e : this.span[n][t].innerHTML = e + a
        }
    }, modifyEvent: function (t, e, i) {
        if ("template" == e)for (var s = 0; s < this.span.length; s++)i(this.datas[s], s); else for (var s = 0; s < this.span.length; s++) {
            var n = this;
            this.span[s][t].addEventListener(e, function () {
                i(n.datas[this.index])
            })
        }
    }
};