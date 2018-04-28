////////////////////////
// BTCP Widget - v0.6 //
////////////////////////
btcpWidget.version = 0.6;

// btcpWidget.scriptHost = "widget.btcprivate.org:8001"; // PRODUCTION
btcpWidget.scriptHost = "widget.btcprivate.co:8001"; // BETA

// Handle the payment response with that JSON data
btcpWidget.data = JSON.parse('{'+
        '"id"          : "btcp_widget",'+
        '"wallet"      : "'+address+'",'+
        '"amount"      : "'+amount+'",'+
        '"description" : "Pepperoni Pizza"'+
     '}');

// Data - would be obtained from DB of course, this is hardcoded for now
btcpWidgetData = {
    'btcpWidget' : {
        'name' : 'Default button',
        'type' : 'Buy',
        'width' : 'auto',
        'height' : 'auto',
        'padding' : '10px',
        'border_radius' : '5px',
        'color' : '#fff',
        'background' : '#272d63',
        'logo' : true
    },
    'btcp_widget' : {
        'name' : 'Supercart checkout button',
        'type' : 'Buy',
        'width' : 'auto',
        'height' : 'auto',
        'padding' : '10px',
        'border_radius' : '5px',
        'color' : '#fff',
        'background' : '#272d63',
        'logo' : true
    },
    'widget_2' : {
        'name' : 'Headphones R Us checkout',
        'type' : 'Buy',
        'width' : '150px',
        'height' : 'auto',
        'padding' : '10px',
        'border_radius' : '0',
        'color' : '#ff0',
        'background' : '#080',
        'logo' : false
    },
    'widget_3' : {
        'name' : 'Music for Kids Charity',
        'type' : 'Donate',
        'width' : 'auto',
        'height' : 'auto',
        'padding' : '5px',
        'border_radius' : '20px',
        'color' : '#fff',
        'background' : '#272d63',
        'logo' : false
    }
}

// Get hex string of UTC timestamp in ms as transaction ref
// TODO: needs more uniqueness. Also create at point payment received not on this JS script load
btcpWidget.transactionRef = Date.now().toString(16);

btcpWidget.getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

btcpWidget.btcpURI = 'bitcoin:'+encodeURI(btcpWidget.data.wallet)+
          '?amount='+encodeURI(btcpWidget.data.amount)+
          '&message='+encodeURI(btcpWidget.data.description)+
          '&r='+encodeURI(btcpWidget.getLocation(window.location).origin);

var approvalOnRecognition = false;
var approvalConfirmsNeeded = 6;

// QRious v4.0.2 : https://github.com/neocotic/qrious : see repo for license: GPLv3 license.
(function(w,t){"object"===typeof exports&&"undefined"!==typeof module?module.exports=t():"function"===typeof define&&define.amd?define(t):w.QRious=t()})(this,function(){function w(a,b){if("function"===typeof Object.create)var c=Object.create(a);else x.prototype=a,c=new x,x.prototype=null;b&&t(!0,c,b);return c}function t(a,b,c){c=A.call(arguments,2);for(var d,f,e=0,g=c.length;e<g;e++)for(d in f=c[e],f)if(!a||B.call(f,d))b[d]=f[d]}function k(){}var x=function(){},B=Object.prototype.hasOwnProperty,A=
Array.prototype.slice;k.class_="Nevis";k.super_=Object;k.extend=function(a,b,c,d){var f=this;"string"!==typeof a&&(d=c,c=b,b=a,a=null);"function"!==typeof b&&(d=c,c=b,b=function(){return f.apply(this,arguments)});t(!1,b,f,d);b.prototype=w(f.prototype,c);b.prototype.constructor=b;b.class_=a||f.class_;b.super_=f;return b};var h=k.extend(function(a,b,c){this.qrious=a;this.element=b;this.element.qrious=a;this.enabled=!!c},{draw:function(a){},getElement:function(){this.enabled||(this.enabled=!0,this.render());
return this.element},getModuleSize:function(a){var b=this.qrious;return Math.max(1,Math.floor((b.size-2*(b.padding||0))/a.width))},getOffset:function(a){var b=this.qrious,c=b.padding;if(null!=c)return c;c=this.getModuleSize(a);return Math.max(0,Math.floor((b.size-c*a.width)/2))},render:function(a){this.enabled&&(this.resize(),this.reset(),this.draw(a))},reset:function(){},resize:function(){}}),C=h.extend({draw:function(a){var b;var c=this.qrious;var d=this.getModuleSize(a),f=this.getOffset(a),e=this.element.getContext("2d");
e.fillStyle=c.foreground;e.globalAlpha=c.foregroundAlpha;for(c=0;c<a.width;c++)for(b=0;b<a.width;b++)a.buffer[b*a.width+c]&&e.fillRect(d*c+f,d*b+f,d,d)},reset:function(){var a=this.qrious,b=this.element.getContext("2d"),c=a.size;b.lineWidth=1;b.clearRect(0,0,c,c);b.fillStyle=a.background;b.globalAlpha=a.backgroundAlpha;b.fillRect(0,0,c,c)},resize:function(){var a=this.element;a.width=a.height=this.qrious.size}}),D=k.extend(null,{BLOCK:[0,11,15,19,23,27,31,16,18,20,22,24,26,28,20,22,24,24,26,28,28,
22,24,24,26,26,28,28,24,24,26,26,26,28,28,24,26,26,26,28,28]}),u=k.extend(null,{BLOCKS:[1,0,19,7,1,0,16,10,1,0,13,13,1,0,9,17,1,0,34,10,1,0,28,16,1,0,22,22,1,0,16,28,1,0,55,15,1,0,44,26,2,0,17,18,2,0,13,22,1,0,80,20,2,0,32,18,2,0,24,26,4,0,9,16,1,0,108,26,2,0,43,24,2,2,15,18,2,2,11,22,2,0,68,18,4,0,27,16,4,0,19,24,4,0,15,28,2,0,78,20,4,0,31,18,2,4,14,18,4,1,13,26,2,0,97,24,2,2,38,22,4,2,18,22,4,2,14,26,2,0,116,30,3,2,36,22,4,4,16,20,4,4,12,24,2,2,68,18,4,1,43,26,6,2,19,24,6,2,15,28,4,0,81,20,1,4,
50,30,4,4,22,28,3,8,12,24,2,2,92,24,6,2,36,22,4,6,20,26,7,4,14,28,4,0,107,26,8,1,37,22,8,4,20,24,12,4,11,22,3,1,115,30,4,5,40,24,11,5,16,20,11,5,12,24,5,1,87,22,5,5,41,24,5,7,24,30,11,7,12,24,5,1,98,24,7,3,45,28,15,2,19,24,3,13,15,30,1,5,107,28,10,1,46,28,1,15,22,28,2,17,14,28,5,1,120,30,9,4,43,26,17,1,22,28,2,19,14,28,3,4,113,28,3,11,44,26,17,4,21,26,9,16,13,26,3,5,107,28,3,13,41,26,15,5,24,30,15,10,15,28,4,4,116,28,17,0,42,26,17,6,22,28,19,6,16,30,2,7,111,28,17,0,46,28,7,16,24,30,34,0,13,24,4,5,
121,30,4,14,47,28,11,14,24,30,16,14,15,30,6,4,117,30,6,14,45,28,11,16,24,30,30,2,16,30,8,4,106,26,8,13,47,28,7,22,24,30,22,13,15,30,10,2,114,28,19,4,46,28,28,6,22,28,33,4,16,30,8,4,122,30,22,3,45,28,8,26,23,30,12,28,15,30,3,10,117,30,3,23,45,28,4,31,24,30,11,31,15,30,7,7,116,30,21,7,45,28,1,37,23,30,19,26,15,30,5,10,115,30,19,10,47,28,15,25,24,30,23,25,15,30,13,3,115,30,2,29,46,28,42,1,24,30,23,28,15,30,17,0,115,30,10,23,46,28,10,35,24,30,19,35,15,30,17,1,115,30,14,21,46,28,29,19,24,30,11,46,15,30,
13,6,115,30,14,23,46,28,44,7,24,30,59,1,16,30,12,7,121,30,12,26,47,28,39,14,24,30,22,41,15,30,6,14,121,30,6,34,47,28,46,10,24,30,2,64,15,30,17,4,122,30,29,14,46,28,49,10,24,30,24,46,15,30,4,18,122,30,13,32,46,28,48,14,24,30,42,32,15,30,20,4,117,30,40,7,47,28,43,22,24,30,10,67,15,30,19,6,118,30,18,31,47,28,34,34,24,30,20,61,15,30],FINAL_FORMAT:[30660,29427,32170,30877,26159,25368,27713,26998,21522,20773,24188,23371,17913,16590,20375,19104,13663,12392,16177,14854,9396,8579,11994,11245,5769,5054,7399,
6608,1890,597,3340,2107],LEVELS:{L:1,M:2,Q:3,H:4}}),q=k.extend(null,{EXPONENT:[1,2,4,8,16,32,64,128,29,58,116,232,205,135,19,38,76,152,45,90,180,117,234,201,143,3,6,12,24,48,96,192,157,39,78,156,37,74,148,53,106,212,181,119,238,193,159,35,70,140,5,10,20,40,80,160,93,186,105,210,185,111,222,161,95,190,97,194,153,47,94,188,101,202,137,15,30,60,120,240,253,231,211,187,107,214,177,127,254,225,223,163,91,182,113,226,217,175,67,134,17,34,68,136,13,26,52,104,208,189,103,206,129,31,62,124,248,237,199,147,
59,118,236,197,151,51,102,204,133,23,46,92,184,109,218,169,79,158,33,66,132,21,42,84,168,77,154,41,82,164,85,170,73,146,57,114,228,213,183,115,230,209,191,99,198,145,63,126,252,229,215,179,123,246,241,255,227,219,171,75,150,49,98,196,149,55,110,220,165,87,174,65,130,25,50,100,200,141,7,14,28,56,112,224,221,167,83,166,81,162,89,178,121,242,249,239,195,155,43,86,172,69,138,9,18,36,72,144,61,122,244,245,247,243,251,235,203,139,11,22,44,88,176,125,250,233,207,131,27,54,108,216,173,71,142,0],LOG:[255,
0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,4,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,5,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,29,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,6,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,54,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,30,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,202,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,7,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,
227,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,55,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,242,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,31,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,108,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,203,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,79,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175]}),E=k.extend(null,{BLOCK:[3220,1468,2713,1235,3062,1890,2119,1549,2344,2936,1117,2583,1330,2470,
1667,2249,2028,3780,481,4011,142,3098,831,3445,592,2517,1776,2234,1951,2827,1070,2660,1345,3177]}),m=k.extend(function(a){var b=a.value.length;this._badness=[];this._level=u.LEVELS[a.level];this._polynomial=[];this._value=a.value;this._version=0;for(this._stringBuffer=[];40>this._version;){this._version++;a=4*(this._level-1)+16*(this._version-1);var c=u.BLOCKS[a++];var d=u.BLOCKS[a++];var f=u.BLOCKS[a++];var e=u.BLOCKS[a];a=f*(c+d)+d-3+(9>=this._version);if(b<=a)break}this._dataBlock=f;this._eccBlock=
e;this._neccBlock1=c;this._neccBlock2=d;a=this.width=17+4*this._version;this.buffer=m._createArray(a*a);this._ecc=m._createArray(f+(f+e)*(c+d)+d);this._mask=m._createArray((a*(a+1)+1)/2);this._insertFinders();this._insertAlignments();this.buffer[8+a*(a-8)]=1;this._insertTimingGap();this._reverseMask();this._insertTimingRowAndColumn();this._insertVersion();this._syncMask();this._convertBitStream(b);this._calculatePolynomial();this._appendEccToData();this._interleaveBlocks();this._pack();this._finish()},
{_addAlignment:function(a,b){var c,d=this.buffer,f=this.width;d[a+f*b]=1;for(c=-2;2>c;c++)d[a+c+f*(b-2)]=1,d[a-2+f*(b+c+1)]=1,d[a+2+f*(b+c)]=1,d[a+c+1+f*(b+2)]=1;for(c=0;2>c;c++)this._setMask(a-1,b+c),this._setMask(a+1,b-c),this._setMask(a-c,b-1),this._setMask(a+c,b+1)},_appendData:function(a,b,c,d){var f,e,g=this._polynomial,l=this._stringBuffer;for(f=0;f<d;f++)l[c+f]=0;for(f=0;f<b;f++){var n=q.LOG[l[a+f]^l[c]];if(255!==n)for(e=1;e<d;e++)l[c+e-1]=l[c+e]^q.EXPONENT[m._modN(n+g[d-e])];else for(e=c;e<
c+d;e++)l[e]=l[e+1];l[c+d-1]=255===n?0:q.EXPONENT[m._modN(n+g[0])]}},_appendEccToData:function(){var a,b=0,c=this._dataBlock,d=this._calculateMaxLength(),f=this._eccBlock;for(a=0;a<this._neccBlock1;a++)this._appendData(b,c,d,f),b+=c,d+=f;for(a=0;a<this._neccBlock2;a++)this._appendData(b,c+1,d,f),b+=c+1,d+=f},_applyMask:function(a){var b,c,d,f=this.buffer,e=this.width;switch(a){case 0:for(d=0;d<e;d++)for(c=0;c<e;c++)c+d&1||this._isMasked(c,d)||(f[c+d*e]^=1);break;case 1:for(d=0;d<e;d++)for(c=0;c<e;c++)d&
1||this._isMasked(c,d)||(f[c+d*e]^=1);break;case 2:for(d=0;d<e;d++)for(c=a=0;c<e;c++,a++)3===a&&(a=0),a||this._isMasked(c,d)||(f[c+d*e]^=1);break;case 3:for(d=b=0;d<e;d++,b++)for(3===b&&(b=0),a=b,c=0;c<e;c++,a++)3===a&&(a=0),a||this._isMasked(c,d)||(f[c+d*e]^=1);break;case 4:for(d=0;d<e;d++)for(a=0,b=d>>1&1,c=0;c<e;c++,a++)3===a&&(a=0,b=!b),b||this._isMasked(c,d)||(f[c+d*e]^=1);break;case 5:for(d=b=0;d<e;d++,b++)for(3===b&&(b=0),c=a=0;c<e;c++,a++)3===a&&(a=0),(c&d&1)+!(!a|!b)||this._isMasked(c,d)||
(f[c+d*e]^=1);break;case 6:for(d=b=0;d<e;d++,b++)for(3===b&&(b=0),c=a=0;c<e;c++,a++)3===a&&(a=0),(c&d&1)+(a&&a===b)&1||this._isMasked(c,d)||(f[c+d*e]^=1);break;case 7:for(d=b=0;d<e;d++,b++)for(3===b&&(b=0),c=a=0;c<e;c++,a++)3===a&&(a=0),(a&&a===b)+(c+d&1)&1||this._isMasked(c,d)||(f[c+d*e]^=1)}},_calculateMaxLength:function(){return this._dataBlock*(this._neccBlock1+this._neccBlock2)+this._neccBlock2},_calculatePolynomial:function(){var a,b,c=this._eccBlock,d=this._polynomial;d[0]=1;for(a=0;a<c;a++){d[a+
1]=1;for(b=a;0<b;b--)d[b]=d[b]?d[b-1]^q.EXPONENT[m._modN(q.LOG[d[b]]+a)]:d[b-1];d[0]=q.EXPONENT[m._modN(q.LOG[d[0]]+a)]}for(a=0;a<=c;a++)d[a]=q.LOG[d[a]]},_checkBadness:function(){var a,b,c,d=0,f=this._badness,e=this.buffer,g=this.width;for(c=0;c<g-1;c++)for(b=0;b<g-1;b++)if(e[b+g*c]&&e[b+1+g*c]&&e[b+g*(c+1)]&&e[b+1+g*(c+1)]||!(e[b+g*c]||e[b+1+g*c]||e[b+g*(c+1)]||e[b+1+g*(c+1)]))d+=m.N2;var l=0;for(c=0;c<g;c++){var n=0;for(b=a=f[0]=0;b<g;b++){var h=e[b+g*c];a===h?f[n]++:f[++n]=1;a=h;l+=a?1:-1}d+=
this._getBadness(n)}0>l&&(l=-l);a=0;for(l=l+(l<<2)<<1;l>g*g;)l-=g*g,a++;d+=a*m.N4;for(b=0;b<g;b++){n=0;for(c=a=f[0]=0;c<g;c++)h=e[b+g*c],a===h?f[n]++:f[++n]=1,a=h;d+=this._getBadness(n)}return d},_convertBitStream:function(a){var b,c=this._ecc,d=this._version;for(b=0;b<a;b++)c[b]=this._value.charCodeAt(b);c=this._stringBuffer=c.slice();var f=this._calculateMaxLength();a>=f-2&&(a=f-2,9<d&&a--);var e=a;if(9<d){c[e+2]=0;for(c[e+3]=0;e--;)b=c[e],c[e+3]|=255&b<<4,c[e+2]=b>>4;c[2]|=255&a<<4;c[1]=a>>4;c[0]=
64|a>>12}else{c[e+1]=0;for(c[e+2]=0;e--;)b=c[e],c[e+2]|=255&b<<4,c[e+1]=b>>4;c[1]|=255&a<<4;c[0]=64|a>>4}for(e=a+3-(10>d);e<f;)c[e++]=236,c[e++]=17},_getBadness:function(a){var b,c=0,d=this._badness;for(b=0;b<=a;b++)5<=d[b]&&(c+=m.N1+d[b]-5);for(b=3;b<a-1;b+=2)d[b-2]===d[b+2]&&d[b+2]===d[b-1]&&d[b-1]===d[b+1]&&3*d[b-1]===d[b]&&(0===d[b-3]||b+3>a||3*d[b-3]>=4*d[b]||3*d[b+3]>=4*d[b])&&(c+=m.N3);return c},_finish:function(){this._stringBuffer=this.buffer.slice();var a,b=0,c=3E4;for(a=0;8>a;a++){this._applyMask(a);
var d=this._checkBadness();d<c&&(c=d,b=a);if(7===b)break;this.buffer=this._stringBuffer.slice()}b!==a&&this._applyMask(b);c=u.FINAL_FORMAT[b+(this._level-1<<3)];d=this.buffer;b=this.width;for(a=0;8>a;a++,c>>=1)c&1&&(d[b-1-a+8*b]=1,6>a?d[8+b*a]=1:d[8+b*(a+1)]=1);for(a=0;7>a;a++,c>>=1)c&1&&(d[8+b*(b-7+a)]=1,a?d[6-a+8*b]=1:d[7+8*b]=1)},_interleaveBlocks:function(){var a,b,c=this._dataBlock,d=this._ecc,f=this._eccBlock,e=0,g=this._calculateMaxLength(),l=this._neccBlock1,h=this._neccBlock2,k=this._stringBuffer;
for(a=0;a<c;a++){for(b=0;b<l;b++)d[e++]=k[a+b*c];for(b=0;b<h;b++)d[e++]=k[l*c+a+b*(c+1)]}for(b=0;b<h;b++)d[e++]=k[l*c+a+b*(c+1)];for(a=0;a<f;a++)for(b=0;b<l+h;b++)d[e++]=k[g+a+b*f];this._stringBuffer=d},_insertAlignments:function(){var a,b;var c=this._version;var d=this.width;if(1<c)for(c=D.BLOCK[c],b=d-7;;){for(a=d-7;a>c-3;){this._addAlignment(a,b);if(a<c)break;a-=c}if(b<=c+9)break;b-=c;this._addAlignment(6,b);this._addAlignment(b,6)}},_insertFinders:function(){var a,b,c,d=this.buffer,f=this.width;
for(a=0;3>a;a++){var e=b=0;1===a&&(b=f-7);2===a&&(e=f-7);d[e+3+f*(b+3)]=1;for(c=0;6>c;c++)d[e+c+f*b]=1,d[e+f*(b+c+1)]=1,d[e+6+f*(b+c)]=1,d[e+c+1+f*(b+6)]=1;for(c=1;5>c;c++)this._setMask(e+c,b+1),this._setMask(e+1,b+c+1),this._setMask(e+5,b+c),this._setMask(e+c+1,b+5);for(c=2;4>c;c++)d[e+c+f*(b+2)]=1,d[e+2+f*(b+c+1)]=1,d[e+4+f*(b+c)]=1,d[e+c+1+f*(b+4)]=1}},_insertTimingGap:function(){var a,b=this.width;for(a=0;7>a;a++)this._setMask(7,a),this._setMask(b-8,a),this._setMask(7,a+b-7);for(a=0;8>a;a++)this._setMask(a,
7),this._setMask(a+b-8,7),this._setMask(a,b-8)},_insertTimingRowAndColumn:function(){var a,b=this.buffer,c=this.width;for(a=0;a<c-14;a++)a&1?(this._setMask(8+a,6),this._setMask(6,8+a)):(b[8+a+6*c]=1,b[6+c*(8+a)]=1)},_insertVersion:function(){var a,b,c=this.buffer,d=this._version,f=this.width;if(6<d){var e=E.BLOCK[d-7];var g=17;for(a=0;6>a;a++)for(b=0;3>b;b++,g--)1&(11<g?d>>g-12:e>>g)?(c[5-a+f*(2-b+f-11)]=1,c[2-b+f-11+f*(5-a)]=1):(this._setMask(5-a,2-b+f-11),this._setMask(2-b+f-11,5-a))}},_isMasked:function(a,
b){var c=m._getMaskBit(a,b);return 1===this._mask[c]},_pack:function(){var a,b,c=1,d=1,f=this.width,e=f-1,g=f-1,h=(this._dataBlock+this._eccBlock)*(this._neccBlock1+this._neccBlock2)+this._neccBlock2;for(a=0;a<h;a++){var k=this._stringBuffer[a];for(b=0;8>b;b++,k<<=1){128&k&&(this.buffer[e+f*g]=1);do d?e--:(e++,c?0!==g?g--:(e-=2,c=!c,6===e&&(e--,g=9)):g!==f-1?g++:(e-=2,c=!c,6===e&&(e--,g-=8))),d=!d;while(this._isMasked(e,g))}}},_reverseMask:function(){var a,b=this.width;for(a=0;9>a;a++)this._setMask(a,
8);for(a=0;8>a;a++)this._setMask(a+b-8,8),this._setMask(8,a);for(a=0;7>a;a++)this._setMask(8,a+b-7)},_setMask:function(a,b){var c=m._getMaskBit(a,b);this._mask[c]=1},_syncMask:function(){var a,b,c=this.width;for(b=0;b<c;b++)for(a=0;a<=b;a++)this.buffer[a+c*b]&&this._setMask(a,b)}},{_createArray:function(a){var b,c=[];for(b=0;b<a;b++)c[b]=0;return c},_getMaskBit:function(a,b){if(a>b){var c=a;a=b;b=c}return c=(b+b*b>>1)+a},_modN:function(a){for(;255<=a;)a-=255,a=(a>>8)+(a&255);return a},N1:3,N2:3,N3:40,
N4:10}),F=m,G=h.extend({draw:function(){this.element.src=this.qrious.toDataURL()},reset:function(){this.element.src=""},resize:function(){var a=this.element;a.width=a.height=this.qrious.size}});h=k.extend(function(a,b,c,d){this.name=a;this.modifiable=!!b;this.defaultValue=c;this._valueTransformer=d},{transform:function(a){var b=this._valueTransformer;return"function"===typeof b?b(a,this):a}});var p=k.extend(null,{abs:function(a){return null!=a?Math.abs(a):null},hasOwn:function(a,b){return Object.prototype.hasOwnProperty.call(a,
b)},noop:function(){},toUpperCase:function(a){return null!=a?a.toUpperCase():null}}),r=k.extend(function(a){this.options={};a.forEach(function(a){this.options[a.name]=a},this)},{exists:function(a){return null!=this.options[a]},get:function(a,b){return r._get(this.options[a],b)},getAll:function(a){var b,c=this.options,d={};for(b in c)p.hasOwn(c,b)&&(d[b]=r._get(c[b],a));return d},init:function(a,b,c){"function"!==typeof c&&(c=p.noop);var d;for(d in this.options)if(p.hasOwn(this.options,d)){var f=this.options[d];
r._set(f,f.defaultValue,b);r._createAccessor(f,b,c)}this._setAll(a,b,!0)},set:function(a,b,c){return this._set(a,b,c)},setAll:function(a,b){return this._setAll(a,b)},_set:function(a,b,c,d){var f=this.options[a];if(!f)throw Error("Invalid option: "+a);if(!f.modifiable&&!d)throw Error("Option cannot be modified: "+a);return r._set(f,b,c)},_setAll:function(a,b,c){if(!a)return!1;var d,f=!1;for(d in a)p.hasOwn(a,d)&&this._set(d,a[d],b,c)&&(f=!0);return f}},{_createAccessor:function(a,b,c){var d={get:function(){return r._get(a,
b)}};a.modifiable&&(d.set=function(d){r._set(a,d,b)&&c(d,a)});Object.defineProperty(b,a.name,d)},_get:function(a,b){return b["_"+a.name]},_set:function(a,b,c){var d="_"+a.name,f=c[d];a=a.transform(null!=b?b:a.defaultValue);c[d]=a;return a!==f}}),y=r,H=k.extend(function(){this._services={}},{getService:function(a){var b=this._services[a];if(!b)throw Error("Service is not being managed with name: "+a);return b},setService:function(a,b){if(this._services[a])throw Error("Service is already managed with name: "+
a);b&&(this._services[a]=b)}}),v=new y([new h("background",!0,"white"),new h("backgroundAlpha",!0,1,p.abs),new h("element"),new h("foreground",!0,"black"),new h("foregroundAlpha",!0,1,p.abs),new h("level",!0,"L",p.toUpperCase),new h("mime",!0,"image/png"),new h("padding",!0,null,p.abs),new h("size",!0,100,p.abs),new h("value",!0,"")]),z=new H;h=k.extend(function(a){v.init(a,this,this.update.bind(this));a=v.get("element",this);var b=z.getService("element"),c=a&&b.isCanvas(a)?a:b.createCanvas();b=a&&
b.isImage(a)?a:b.createImage();this._canvasRenderer=new C(this,c,!0);this._imageRenderer=new G(this,b,b===a);this.update()},{get:function(){return v.getAll(this)},set:function(a){v.setAll(a,this)&&this.update()},toDataURL:function(a){return this.canvas.toDataURL(a||this.mime)},update:function(){var a=new F({level:this.level,value:this.value});this._canvasRenderer.render(a);this._imageRenderer.render(a)}},{use:function(a){z.setService(a.getName(),a)}});Object.defineProperties(h.prototype,{canvas:{get:function(){return this._canvasRenderer.getElement()}},
image:{get:function(){return this._imageRenderer.getElement()}}});y=k.extend({getName:function(){}}).extend({createCanvas:function(){},createImage:function(){},getName:function(){return"element"},isCanvas:function(a){},isImage:function(a){}}).extend({createCanvas:function(){return document.createElement("canvas")},createImage:function(){return document.createElement("img")},isCanvas:function(a){return a instanceof HTMLCanvasElement},isImage:function(a){return a instanceof HTMLImageElement}});h.use(new y);
return h});

// SVG BTCP logo
btcpLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-678 877.2 226.8 226.8"><switch><g><path d="M-564.6 877.2c-62.6 0-113.4 50.8-113.4 113.4s50.8 113.4 113.4 113.4c62.6 0 113.4-50.8 113.4-113.4S-502 877.2-564.6 877.2zm58.6 154.5c-8.1 23.3-27.4 25.2-53.1 20.4l-6.2 25-14.9-3.7 5.8-23.9.2-.8 4.5-18.4c13.3 3 31.3 4.8 34.8-9 1.8-7.4-1.7-12.7-7.4-16.6 2-.1 3.9-.2 5.9-.3 4.3-.2 6.4-.5 10.6-1.3 4.3-.7 9.4-2.4 13-3.7.2-.1.3-.1.5-.2 7.7 6.9 11.4 18.1 6.3 32.5zm5.4-58.3c-.8 5.6-2.8 11.1-6.7 15.3-3.4 3.6-8.7 5.5-13.3 7-5.4 1.8-11.2 2.9-16.9 2.9-3.8 0-7.7-.1-11.5-.4-6.2-.5-12.6-1-18.7-2.4-2-.5-3.7-.8-5.5-1.3l-8.3 33.2-4.9 18.1-6.2 24.8-15-3.8 6.2-25.1c-3.5-.9-7.1-1.9-10.7-2.8l-19.6-4.9 7.5-17.3s11.1 3 11 2.7c4.3 1.1 6.2-1.7 6.9-3.6l8.5-34 3.9-15.8 4.5-18.1c.2-3.2-.9-7.2-7-8.8.2-.2-10.9-2.7-10.9-2.7l4-16.1 20.8 5.3c3.1.8 6.3 1.5 9.6 2.3l6.2-24.8 15.1 3.8-6 24.3c4 .9 8.1 1.9 12.1 2.8l6-24.1 15.1 3.8-6.2 24.8c18.8 6.8 32.8 16.6 30 34.9zm-61.2-24.1l-7.5 30.1c8.5 2.1 34.7 10.8 39-6.3 4.4-17.7-23-21.7-31.5-23.8z" fill="white" /></g></switch></svg>';

btcpLogoFull = '<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 4439 806"><g transform="scale(5.5556)"><clipPath id="a"><path d="M142.12 90.166c-9.61 38.596-48.653 62.082-87.204 52.459C16.38 133.001-7.08 93.911 2.536 55.318 12.141 16.72 51.184-6.77 89.724 2.852c38.549 9.621 62.006 48.718 52.396 87.314z"/></clipPath><g clip-path="url(#a)"><path fill="#2b2f63" fill-rule="nonzero" d="M-4.615-4.304h153.89v154.08H-4.615z"/></g><clipPath id="b"><path d="M98.005 81.934c-2.7.466-4.04.641-6.773.801-1.248.074-2.5.153-3.754.221 3.627 2.487 5.899 5.887 4.722 10.615-2.196 8.827-13.714 7.628-22.231 5.736l-2.865 11.737h.002l-.129.514-3.732 15.279 9.558 2.385 3.985-15.988c16.421 3.111 28.769 1.853 33.965-13.017 3.234-9.243.892-16.364-4.112-20.794-.107.052-.214.1-.317.137-2.325.841-5.596 1.906-8.319 2.374z"/></clipPath><g clip-path="url(#b)"><path fill="#fefefe" fill-rule="nonzero" d="M58.245 74.423h58.995v59.799H58.245z"/></g><clipPath id="c"><path d="M95.178 62.507c-2.716 10.893-19.473 5.358-24.91 4.002l4.794-19.25c5.437 1.356 22.943 3.89 20.116 15.248zm3.664-37.836l-9.629-2.404-3.84 15.421a418.136 418.136 0 0 0-7.717-1.816l3.867-15.524-9.623-2.402-3.946 15.832a319.126 319.126 0 0 1-6.149-1.446l-13.27-3.369-2.563 10.298s7.146 1.638 6.997 1.741c3.898.974 4.604 3.557 4.486 5.605l-2.88 11.567-2.508 10.074-5.417 21.748c-.479 1.188-1.687 2.969-4.414 2.291.096.142-7.001-1.748-7.001-1.748l-4.779 11.034 12.532 3.129c2.331.586 4.614 1.199 6.863 1.776l-3.983 16.019 9.616 2.404 3.948-15.852 3.129-11.599 5.288-21.226c1.112.272 2.225.515 3.49.803 3.885.906 7.962 1.241 11.928 1.538 2.439.182 4.886.304 7.331.274 3.645-.046 7.364-.727 10.809-1.882 2.893-.967 6.335-2.205 8.483-4.487 2.513-2.669 3.776-6.215 4.311-9.79 1.746-11.693-7.145-17.978-19.303-22.17l3.944-15.839z"/></clipPath><g clip-path="url(#c)"><path fill="#fefefe" fill-rule="nonzero" d="M25.456 12.946h93.964v116.96H25.456z"/></g><g transform="translate(0 1)"><clipPath id="d"><path d="M534.79 37.27c8.505 0 14.918 1.606 19.24 4.818s6.484 7.89 6.484 14.035c0 4.748-.897 8.85-2.689 12.306-1.792 3.457-4.34 6.302-7.643 8.537-3.303 2.234-7.274 3.892-11.913 4.975-4.638 1.082-9.804 1.623-15.497 1.623h-7.274l-6.536 27.022h-10.226l17.289-71.64c2.952-.699 6.08-1.152 9.383-1.362 3.303-.209 6.431-.314 9.382-.314zm-1.265 8.588c-4.99 0-8.012.14-9.066.419l-6.958 28.803h6.642c2.952 0 5.974-.262 9.066-.785 3.093-.524 5.869-1.449 8.329-2.776a16.91 16.91 0 0 0 6.061-5.499c1.582-2.339 2.372-5.359 2.372-9.059 0-3.98-1.476-6.826-4.427-8.536-2.952-1.711-6.958-2.567-12.019-2.567zm53.906 9.113c.844 0 1.792.035 2.847.104 1.054.07 2.091.192 3.11.367 1.019.174 1.95.349 2.793.524.844.174 1.476.366 1.898.576l-2.846 8.483c-1.406-.558-3.023-.977-4.85-1.256a34.804 34.804 0 0 0-5.271-.419c-1.476 0-2.934.104-4.375.314-1.441.209-2.688.489-3.742.838l-11.175 46.084h-9.804l12.65-52.369c2.811-.977 5.834-1.763 9.067-2.356a53.548 53.548 0 0 1 9.698-.89zm13.213 55.615h-9.804l13.178-54.463h9.804l-13.178 54.463zm11.386-64.309c-1.617 0-2.97-.488-4.059-1.466-1.089-.977-1.634-2.339-1.634-4.085 0-2.234.703-3.997 2.108-5.289 1.406-1.292 2.987-1.938 4.744-1.938 1.617 0 2.987.507 4.112 1.519 1.124 1.013 1.687 2.427 1.687 4.242 0 2.095-.738 3.788-2.214 5.08s-3.057 1.937-4.744 1.937zm13.002 64.309a227.523 227.523 0 0 1-2.425-11.73 306.078 306.078 0 0 1-2.108-13.354 286.73 286.73 0 0 1-1.582-14.402c-.421-4.957-.702-9.95-.843-14.977h9.91c.07 3.421.228 7.069.474 10.945.246 3.875.545 7.75.896 11.626.352 3.875.773 7.611 1.265 11.207s1.019 6.86 1.582 9.793c2.108-2.654 4.304-5.778 6.589-9.374a174.33 174.33 0 0 0 6.588-11.312c2.109-3.945 4.042-7.908 5.799-11.888s3.162-7.646 4.216-10.997h9.91c-1.546 4.608-3.514 9.391-5.903 14.349-2.39 4.957-4.973 9.828-7.749 14.611s-5.693 9.374-8.75 13.773-6.027 8.309-8.908 11.73h-8.961zm71.511.629a38.738 38.738 0 0 1-1.054-2.566 19.701 19.701 0 0 1-.843-2.985c-1.547 1.396-3.62 2.793-6.22 4.189-2.601 1.397-5.798 2.095-9.594 2.095-3.092 0-5.745-.489-7.959-1.466-2.214-.978-4.024-2.34-5.429-4.085-1.406-1.746-2.443-3.806-3.11-6.18-.668-2.374-1.002-4.992-1.002-7.855 0-4.678.791-9.252 2.372-13.721a35.01 35.01 0 0 1 7.116-11.94c3.163-3.491 7.134-6.319 11.913-8.484 4.779-2.164 10.366-3.246 16.762-3.246 1.898 0 4.112.209 6.642.628s4.709 1.117 6.536 2.095l-8.118 32.887c-.351 1.606-.65 3.143-.896 4.609s-.369 3.002-.369 4.608.141 3.23.422 4.871.773 3.404 1.476 5.289l-8.645 1.257zm-15.708-7.541c2.952 0 5.482-.629 7.591-1.886 2.108-1.257 3.936-2.723 5.482-4.399.07-1.187.193-2.426.369-3.718.175-1.292.404-2.601.685-3.928l6.325-25.974c-.351-.14-.931-.245-1.739-.315a25.718 25.718 0 0 0-2.161-.104c-4.006 0-7.626.768-10.859 2.304s-5.991 3.578-8.275 6.127c-2.285 2.549-4.042 5.516-5.272 8.903-1.23 3.386-1.844 6.93-1.844 10.631 0 1.466.14 2.95.421 4.451s.791 2.828 1.529 3.98 1.722 2.095 2.952 2.828 2.828 1.1 4.796 1.1zm49.9 8.379c-5.271 0-9.136-1.152-11.596-3.457-2.46-2.304-3.69-5.656-3.69-10.055 0-2.862.492-6.528 1.476-10.997l11.28-46.608 10.226-1.676-4.111 16.863h18.659l-2.003 8.169h-18.659l-5.799 24.09c-.843 3.282-1.265 6.145-1.265 8.588 0 2.305.633 3.963 1.898 4.975 1.265 1.013 3.373 1.519 6.325 1.519 2.038 0 4.041-.332 6.009-.995s3.479-1.274 4.533-1.833l.738 8.274c-1.054.629-2.846 1.31-5.376 2.043s-5.412 1.1-8.645 1.1zm30.819-30.06c4.076-.14 7.801-.402 11.174-.786 3.374-.384 6.291-1.047 8.75-1.99 2.46-.942 4.375-2.217 5.746-3.823 1.37-1.606 2.056-3.7 2.056-6.284 0-.628-.123-1.292-.369-1.99s-.668-1.344-1.265-1.937c-.598-.594-1.424-1.083-2.478-1.467s-2.354-.576-3.9-.576c-2.46 0-4.762.524-6.906 1.571a20.938 20.938 0 0 0-5.745 4.137c-1.687 1.711-3.128 3.701-4.322 5.97a32.194 32.194 0 0 0-2.741 7.175zm10.015 29.955c-3.585 0-6.677-.506-9.277-1.519-2.601-1.012-4.78-2.409-6.537-4.189a16.742 16.742 0 0 1-3.9-6.232c-.844-2.374-1.265-4.888-1.265-7.541 0-4.888.738-9.601 2.214-14.14s3.584-8.553 6.325-12.045a30.665 30.665 0 0 1 10.015-8.326c3.936-2.06 8.399-3.09 13.389-3.09 2.881 0 5.359.366 7.432 1.1 2.073.733 3.76 1.728 5.06 2.985a11.968 11.968 0 0 1 2.899 4.346c.633 1.641.949 3.334.949 5.08 0 3.282-.597 6.057-1.792 8.327-1.195 2.269-2.776 4.172-4.744 5.708s-4.27 2.723-6.905 3.561a61.463 61.463 0 0 1-8.223 1.99c-2.847.489-5.728.82-8.645.995s-5.675.332-8.275.471a11.268 11.268 0 0 0-.106 1.362v.838c0 1.606.193 3.124.58 4.556a8.508 8.508 0 0 0 2.161 3.77c1.054 1.083 2.513 1.938 4.375 2.566 1.863.629 4.305.943 7.327.943 1.335 0 2.723-.122 4.164-.366a35.59 35.59 0 0 0 4.112-.943 50.73 50.73 0 0 0 3.479-1.152c1.019-.384 1.739-.751 2.161-1.1l.843 8.274c-1.406.768-3.672 1.589-6.8 2.462-3.127.872-6.799 1.309-11.016 1.309z"/></clipPath><g clip-path="url(#d)"><path fill="#75a0d4" fill-rule="nonzero" d="M493.73 28.499h310.14v88.554H493.73z"/></g></g><clipPath id="e"><path d="M195.97 112.58c-4.216 0-8.539-.175-12.966-.524-4.428-.349-8.434-.908-12.019-1.676l16.868-70.174c4.006-.768 8.205-1.292 12.598-1.571s8.416-.419 12.071-.419c4.217 0 7.854.437 10.911 1.309 3.057.873 5.552 2.043 7.485 3.509s3.373 3.195 4.322 5.185 1.423 4.102 1.423 6.336c0 1.536-.158 3.142-.474 4.818s-.949 3.334-1.898 4.975c-.948 1.641-2.249 3.195-3.9 4.661-1.652 1.466-3.813 2.793-6.484 3.98 3.163 1.396 5.482 3.299 6.958 5.708s2.214 5.08 2.214 8.013c0 3.351-.668 6.581-2.003 9.688s-3.479 5.865-6.431 8.274-6.782 4.329-11.491 5.761c-4.709 1.431-10.436 2.147-17.184 2.147zm-1.475-32.678l-4.534 18.852c1.125.21 2.548.367 4.27.472s3.321.157 4.797.157c2.108 0 4.199-.157 6.272-.471 2.074-.315 3.936-.891 5.588-1.729 1.651-.838 3.004-1.99 4.058-3.456 1.055-1.466 1.582-3.352 1.582-5.656 0-.977-.193-1.955-.58-2.932-.387-.978-1.002-1.851-1.845-2.619s-1.95-1.396-3.321-1.885c-1.37-.489-3.004-.733-4.902-.733h-11.385zm3.057-12.255h10.331c4.217 0 7.362-.907 9.435-2.723 2.074-1.815 3.11-3.98 3.11-6.494 0-1.326-.298-2.461-.896-3.404a6.643 6.643 0 0 0-2.372-2.251c-.984-.559-2.108-.96-3.373-1.205a20.55 20.55 0 0 0-3.901-.366c-1.476 0-3.057.052-4.744.157-1.687.104-2.952.227-3.795.366l-3.795 15.92zm53.484 43.99h-15.602l13.177-55.092h15.708l-13.283 55.092zm7.59-61.795c-2.178 0-4.146-.646-5.903-1.938-1.757-1.291-2.636-3.264-2.636-5.917 0-1.467.299-2.846.896-4.137.598-1.292 1.388-2.409 2.372-3.352s2.126-1.693 3.427-2.252c1.3-.559 2.688-.838 4.164-.838 2.178 0 4.146.646 5.903 1.938s2.636 3.264 2.636 5.917a9.745 9.745 0 0 1-.896 4.138 10.97 10.97 0 0 1-2.372 3.351 11.423 11.423 0 0 1-3.426 2.252 10.436 10.436 0 0 1-4.165.838zm17.325-7.017l16.34-2.514-4.006 16.234h17.5l-3.162 12.778h-17.395l-4.639 19.272c-.421 1.606-.685 3.107-.79 4.504-.106 1.396.07 2.601.527 3.613.457 1.013 1.247 1.798 2.372 2.357 1.124.558 2.67.838 4.638.838 1.687 0 3.321-.158 4.902-.472a36.276 36.276 0 0 0 4.797-1.309l1.16 11.94a56.674 56.674 0 0 1-6.853 1.99c-2.459.559-5.376.838-8.75.838-4.849 0-8.609-.716-11.28-2.147-2.67-1.432-4.568-3.387-5.693-5.865-1.124-2.479-1.616-5.325-1.476-8.537.141-3.211.633-6.598 1.476-10.159l10.332-43.361zm25.969 46.817c0-4.748.773-9.217 2.319-13.406 1.546-4.19 3.76-7.855 6.642-10.998 2.881-3.142 6.378-5.621 10.489-7.436 4.112-1.815 8.697-2.723 13.758-2.723 3.162 0 5.991.297 8.486.89 2.495.594 4.762 1.379 6.8 2.357l-5.377 12.149a53.387 53.387 0 0 0-4.375-1.518c-1.511-.454-3.356-.681-5.534-.681-5.271 0-9.418 1.763-12.44 5.289s-4.533 8.327-4.533 14.401c0 3.562.773 6.442 2.319 8.641 1.546 2.2 4.393 3.3 8.539 3.3 2.038 0 4.006-.21 5.904-.629s3.584-.943 5.06-1.571l1.16 12.464c-1.968.768-4.129 1.449-6.484 2.042-2.354.594-5.218.89-8.592.89-4.357 0-8.047-.628-11.069-1.885s-5.517-2.95-7.485-5.08c-1.968-2.129-3.391-4.625-4.269-7.488-.879-2.863-1.318-5.866-1.318-9.008zm65.502 23.461c-3.725 0-6.958-.558-9.699-1.675-2.741-1.118-5.007-2.689-6.799-4.713-1.793-2.025-3.146-4.417-4.059-7.175-.914-2.758-1.371-5.813-1.371-9.165 0-4.189.686-8.379 2.056-12.568 1.37-4.19 3.391-7.96 6.062-11.312 2.67-3.351 5.939-6.092 9.804-8.222 3.866-2.129 8.293-3.194 13.283-3.194 3.655 0 6.87.558 9.646 1.676 2.776 1.117 5.061 2.688 6.853 4.713s3.145 4.416 4.059 7.174c.913 2.758 1.37 5.813 1.37 9.165 0 4.189-.668 8.379-2.003 12.568-1.335 4.19-3.303 7.96-5.904 11.312-2.6 3.352-5.851 6.092-9.751 8.222-3.901 2.13-8.416 3.194-13.547 3.194zm7.801-44.827c-2.319 0-4.357.663-6.114 1.99-1.757 1.326-3.233 3.002-4.428 5.027s-2.091 4.242-2.688 6.651c-.598 2.409-.896 4.696-.896 6.86 0 3.561.562 6.302 1.687 8.222 1.124 1.92 3.162 2.881 6.114 2.881 2.319 0 4.357-.664 6.114-1.99 1.758-1.327 3.233-3.003 4.428-5.028s2.091-4.242 2.688-6.651c.598-2.409.897-4.695.897-6.86 0-3.561-.563-6.302-1.687-8.222-1.125-1.92-3.163-2.88-6.115-2.88zm38.831 43.361h-15.603l13.178-55.092h15.708l-13.283 55.092zm7.59-61.795c-2.179 0-4.146-.646-5.903-1.938-1.757-1.291-2.636-3.264-2.636-5.917 0-1.467.299-2.846.896-4.137.598-1.292 1.388-2.409 2.372-3.352s2.126-1.693 3.426-2.252a10.435 10.435 0 0 1 4.164-.838c2.179 0 4.147.646 5.904 1.938s2.636 3.264 2.636 5.917a9.745 9.745 0 0 1-.896 4.138 10.97 10.97 0 0 1-2.372 3.351 11.416 11.416 0 0 1-3.427 2.252c-1.3.559-2.688.838-4.164.838zm15.005 9.217a197.81 197.81 0 0 0 3.954-1.205c1.44-.453 3.057-.872 4.849-1.256s3.795-.699 6.009-.943 4.727-.367 7.538-.367c8.293 0 13.986 2.374 17.078 7.122 3.093 4.749 3.62 11.242 1.582 19.482l-7.169 29.745h-15.708l6.958-29.117c.421-1.815.755-3.578 1.001-5.289s.229-3.212-.052-4.504c-.282-1.292-.932-2.339-1.951-3.142s-2.583-1.204-4.691-1.204c-2.038 0-4.111.209-6.22.628l-10.226 42.628h-15.708l12.756-52.578z"/></clipPath><g clip-path="url(#e)"><path fill="#2b2f64" fill-rule="nonzero" d="M165.98 26.405h317.89V118.1H165.98z"/></g></g></svg>';

clipboardIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M779.5,82.6h-76.2V64.4c0-29-29-54.4-65.3-54.4H365.7c-36.3,0-65.3,25.4-65.3,54.4v18.1h-79.9c-36.3,0-65.3,29-65.3,65.3v776.7c0,36.3,29,65.3,65.3,65.3h559c36.3,0,65.3-29,65.3-69V147.9C844.8,111.6,815.8,82.6,779.5,82.6z M333,64.4c0-10.9,14.5-18.1,29-18.1h272.2c14.5,0,29,7.3,29,18.1v90.7H336.7H333V64.4z M808.5,921c0,14.5-14.5,29-29,29h-559c-14.5,0-29-10.9-29-29V147.9c0-14.5,14.5-29,29-29h79.9v72.6h399.3h3.6v-72.6h76.2c14.5,0,29,10.9,29,29V921z" fill="white"/></g></svg>';

// Get selector function
var get = function(elem) {
    return document.getElementById(elem);
}

// Set fallback ID
btcpWidgetID = "undefined" !== typeof btcpWidget.data ? btcpWidget.data.id : 'btcpWidget';

toolTipStyles = '.tooltip {position: relative; display: inline-block;} .tooltip .tooltiptext {visibility: hidden; width: 140px; background-color: '+btcpWidgetData[btcpWidgetID]['background']+'; color: #fff; text-align: center; border-radius: '+btcpWidgetData[btcpWidgetID]['border_radius']+'; padding: 5px; position: absolute; z-index: 1; bottom: 150%; left: 50%; margin-left: -75px; opacity: 0; transition: opacity 0.3s;} .tooltip .tooltiptext::after {content: ""; position: absolute; top: 100%; left: 50%; margin-left: -5px; border-width: 5px; border-style: solid; border-color: '+btcpWidgetData[btcpWidgetID]['background']+' transparent transparent transparent;} .tooltip:hover .tooltiptext {visibility: visible; opacity: 1;}';

document.body.innerHTML += '<style>'+toolTipStyles+'</style>';

// Create widget button with styles based on data
var widget = document.createElement("div");
widget.id = "btcpButton";
widget.style.display = "inline-block";
widget.style.width = btcpWidgetData[btcpWidgetID]['width'];
widget.style.height = btcpWidgetData[btcpWidgetID]['height'];
widget.style.padding = btcpWidgetData[btcpWidgetID]['padding'];
widget.style.color = btcpWidgetData[btcpWidgetID]['color'];
widget.style.background = btcpWidgetData[btcpWidgetID]['background'];
widget.style.fontFamily = "Arial";
widget.style.borderRadius = btcpWidgetData[btcpWidgetID]['border_radius'];
// Add logo if that setting enabled
if (btcpWidgetData[btcpWidgetID]['logo']) {
	widget.style.background = 'url(\'data:image/svg+xml;charset=UTF-8,'+btcpLogo+'\') no-repeat 5px 5px '+btcpWidgetData[btcpWidgetID]['background'];
	widget.style.backgroundSize = '24px 24px';
	widget.style.paddingLeft = (26+parseInt(btcpWidgetData[btcpWidgetID]['padding'],10)) + 'px';
}
widget.style.cursor = "pointer";
widget.innerHTML = (btcpWidgetData[btcpWidgetID]['type'] === "Buy" ? "Buy" : "Donate") + " with $BTCP";

var copy = function() {
  get("walletAddressInput").select();
  document.execCommand("Copy");
  get("myTooltip").style.width = "70px";
  get("myTooltip").style.marginLeft = "-40px";
  get("myTooltip").innerHTML = "Copied!";
}

function outFunc() {
  get("myTooltip").style.width = "140px";
  get("myTooltip").style.marginLeft = "-75px";
  get("myTooltip").innerHTML = "Copy to clipboard";
}

// On click of widget button, display in an overlay
widget.onclick = function() {btcpWidget.showPaymentScreen();}

btcpWidget.returnScreenHeading = function() {
    // Overlay
    var o = document.createElement("div");
    o.id = "btcpButtonOverlay";
    o.style.position = "fixed";
    o.style.display = "block";
    o.style.width = "100%";
    o.style.top = "0";
    o.style.left = "0";
    o.style.height = "100%";
    o.style.textAlign = "center";
    o.style.padding = "0";
    o.style.color = "#fff";
    o.style.background = "rgba(0,0,0,0.01)";
    o.style.fontFamily = "Arial";
    o.style.paddingTop = "1500px";
    o.style.transition = "all 0.3s ease-in-out";

    // Close link
    var c = document.createElement("div");
    c.style.position = "absolute";
    c.style.display = "inline-block";
    c.style.margin = "-30px auto auto 147px";
    c.style.fontSize = "24px";
    c.style.color = "#555";
    c.style.cursor = "pointer";
    c.onclick = function(){paidEnough ? alert("Payment in progress, please wait") : btcpWidget.doOverlay('hide');};
    c.onmouseover = function(){this.style.color = '#ddd'};
    c.onmouseout = function(){this.style.color = '#555'};
    c.innerHTML = "x";

    // BTCP full logo
    var l = document.createElement("div");
    l.style.display = "block";
    l.style.margin = "0 auto 20px auto";
    l.style.width = "320px";
    l.style.height = "58px";
    l.style.background = 'url(\'data:image/svg+xml;charset=UTF-8,'+btcpLogoFull+'\') no-repeat 0 0';
	l.style.backgroundSize = '320px 58px';
    l.style.cursor = "pointer";
    l.onclick = function(){window.open("https://btcprivate.org");};
    l.oncontextmenu = function(){
        btcpWidget.incrLogoRightClicks(event);
        return false;
    };

    return {'overlay':o,'closeLink':c,'btcpFullLogo':l};
}

btcpWidget.showPaymentScreen = function(anim) {
    // Get heading
    var
    h = btcpWidget.returnScreenHeading(),
    o = h['overlay'],
    d = h['closeLink'],
    l = h['btcpFullLogo'];

    // Please pay text
    var p = document.createElement("div");
    p.id = "payAmountText";
    p.style.margin = "0 auto";
    p.innerHTML = 'Please pay <b>'+btcpWidget.data.amount+' BTCP</b> to wallet:';

    // Wallet address
    var w = document.createElement("span");
    w.id = "walletAddress";
    w.className = "walletAddress";
    w.style.padding = "10px";
    w.style.fontSize = "12px";
    w.style.color = "#fff";
    w.style.background = "#111";
    w.innerHTML = btcpWidget.data.wallet;

    // Wallet input
    var wI = document.createElement("input");
    wI.id = "walletAddressInput";
    wI.type = "text";
    wI.value = btcpWidget.data.wallet;
    wI.style.position = "absolute";
    wI.style.top = "-1000px";

    // Clipboard tooltip
    var cT = document.createElement("div");
    cT.id = "clipboardTooltip";
    cT.className = "tooltip";
    cT.style.margin = "0 auto 24px auto";

    // Clipboard link
    var cL = document.createElement("a");
    cL.href = "javascript:copy()";
    cL.id = "clipboardLink";
    cL.onmouseout = function() {outFunc()};
    cL.style.position = "absolute";
    cL.style.display = "inline-block";
    cL.style.width = "34px";
    cL.style.height = "34px";
    cL.style.top = "3px";
    cL.style.background = btcpWidgetData[btcpWidgetID]['background'];

    // Clipboard tooltip text
    var cTT = document.createElement("span");
    cTT.id = "myTooltip";
    cTT.className = "tooltiptext";
    cTT.innerHTML = "Copy to clipboard";

    var c = document.createElement("div");
    c.style.position = "absolute";
    c.style.display = "inline-block";
    c.style.top = "6px";
    c.style.left = "7px";
    c.style.width = "23px";
    c.style.height = "23px";
    c.style.background = 'url(\'data:image/svg+xml;charset=UTF-8,'+clipboardIcon+'\') no-repeat 0 0';
	c.style.backgroundSize = '20px 20px';
    c.style.cursor = "pointer";

    // Wallet button
    var wB = btcpWidget.returnButton();
    wB.id = "electrumButton";
    wB.style.width = "176px";
    wB.innerHTML = "Pay via BTCP wallet";
    wB.href = btcpWidget.btcpURI;

    // Wallet what
    var wW = document.createElement("a");
    wW.id = "walletWhat";
    wW.style.fontSize = "10px";
    wW.style.color = "#bbb";
    wW.style.textDecoration = "none";
    wW.innerHTML = "What is this?";
    wW.href = "javascript:alert(\'Expand div to explain what it is, uses etc\')";

    var wG = document.createElement("a");
    wG.id = "walletGet";
    wG.style.fontSize = "10px";
    wG.style.color = "#bbb";
    wG.style.textDecoration = "none";
    wG.style.margin = "0 0 20px 5px";
    wG.innerHTML = "Get it!";
    wG.href = "javascript:alert(\'Go to link to get it...\')";

    var qH = document.createElement("b");
    qH.id = "qrCodeHeading";
    qH.style.display = "block";
    qH.style.margin = "20px auto 10px auto";
    qH.innerHTML = "or by QR Code:";

    var qE = document.createElement("canvas");
    qE.id = "qrCode";
    qE.style.display = "inline-block";
    qE.style.marginBottom = "20px";
    qE.style.background = "#fff";

    var t = document.createElement("div");
    t.id = "transactionRef";
    t.style.display = "none";
    t.style.width = "200px";
    t.style.margin = "5px auto 20px auto";
    t.innerHTML = "Transaction ref: "+btcpWidget.transactionRef;

    var oP = document.createElement("div");
    oP.id = "orderProgressBarContainer";
    oP.style.display = "none";
    oP.style.width = "200px";
    oP.style.margin = "5px auto 20px auto";
    oP.style.textAlign = "left";
    oP.style.background = "#888";
    oP.innerHTML = '<div id="orderProgressBar" style="display: inline-block; width: 0; background: #272d63; transition: all 0.5s ease-in-out">&nbsp;</div>';

    var oI = document.createElement("b");
    oI.id = "orderProgressInfo";
    oI.style.display = "block";
    oI.style.marginBottom = "5px";
    oI.innerHTML = "Order completes after:<br>"+(approvalOnRecognition ? "BTCP sent" : approvalConfirmsNeeded+" confirmations");

    var hL = document.createElement("a");
    hL.style.fontSize = "10px"
    hL.style.color = "#bbb";
    hL.style.textDecoration = "none";
    hL.innerHTML = "Need help?";
    hL.href = "https://support.btcprivate.org/";
    hL.target = "_blank";

    cL.appendChild(cTT);
    cL.appendChild(c);
    cT.appendChild(cL);

    // Add all the children to overlay
    for (var i=0, c=[d,l,p,w,wI,cT,wB,wW,wG,qH,qE,t,oP,oI,hL]; i<c.length; i++) {
        o.appendChild(c[i]);
    }

    // Add overlay with 4 options to merchants website
    document.body.insertAdjacentElement('afterend',o);
    // Do regular 'show' anim unless an anim specified
    btcpWidget.doOverlay(!anim ? 'show' : anim);
    btcpWidget.generateQRCode(btcpWidget.btcpURI);
}

btcpWidget.generateQRCode = function(val) {
    var qr = new QRious({
        element: get('qrCode'),
        value: val,
        size: 128,
        level: 'L', // Error correction (L, M, Q, H)
    });
}

btcpWidget.showMerchantSupportScreen = function(anim) {
    get('btcpButtonOverlay').parentNode.removeChild(get('btcpButtonOverlay'));
    // Get heading
    var
    h = btcpWidget.returnScreenHeading(),
    o = h['overlay'],
    d = h['closeLink'],
    l = h['btcpFullLogo'];

    var m = document.createElement("div");
    m.style.margin = "0 auto";
    m.innerHTML = 'Merchant Support<br><br>Widget Version v'+btcpWidget.version;

    var dS = btcpWidget.returnButton();
    dS.style.width = "176px";
    dS.style.cursor = "pointer";
    dS.innerHTML = "Display Setup Info";
    dS.onclick = function() {
        btcpWidget.displayInfo();
    }

    var vS = btcpWidget.returnButton();
    vS.style.width = "176px";
    vS.innerHTML = "vendors.btcprivate.org";
    vS.href = "https://vendors.btcprivate.org";
    vS.target = "_blank";

    var sS = btcpWidget.returnButton();
    sS.style.width = "176px";
    sS.innerHTML = "support.btcprivate.org";
    sS.href = "https://support.btcprivate.org";
    sS.target = "_blank";

    var mS = btcpWidget.returnButton();
    mS.style.width = "176px";
    mS.innerHTML = "btcprivate.org";
    mS.href = "https://btcprivate.org";
    mS.target = "_blank";

    var b = document.createElement("a");
    b.style.display = "block"
    b.style.fontSize = "10px"
    b.style.color = "#bbb";
    b.style.textDecoration = "none";
    b.style.margin = "20px auto 0 auto";
    b.style.cursor = "pointer";
    b.innerHTML = "&lt;&lt;&lt; Back";
    b.onclick = function() {
        get('btcpButtonOverlay').parentNode.removeChild(get('btcpButtonOverlay'));
        btcpWidget.showPaymentScreen('show-instant');
    };

    // Add all the children to overlay
    for (var i=0, c=[d,l,m,dS,vS,sS,mS,b]; i<c.length; i++) {
        o.appendChild(c[i]);
    }

    // Add overlay with 4 options to merchants website
    document.body.insertAdjacentElement('afterend',o);
    // Do regular 'show' anim unless an anim specified
    btcpWidget.doOverlay('show-instant');
}

btcpWidget.returnButton = function() {
    var button = document.createElement("a");
    button.style.display = "block";
    button.style.width = "auto";
    button.style.margin = "20px auto 5px auto";
    button.style.fontSize = "18px";
    button.style.color = "#fff";
    button.style.background = btcpWidgetData[btcpWidgetID]['background'];
    button.style.borderRadius = btcpWidgetData[btcpWidgetID]['border_radius'];
    button.style.padding = "10px";
    button.style.textDecoration = "none";
    return button;
}

btcpWidget.doOverlay = function(vis) {
    var winH = window.innerHeight;
    var topH = (winH - 505) / 2;
    if (vis === "show") {
        setTimeout(function () {
            get('btcpButtonOverlay').style.paddingTop = ((topH > 0 ? topH : 0) + 30)+"px";
            get('btcpButtonOverlay').style.background = "rgba(0,0,0,0.9)";
        },0);
        setTimeout(function () {
            get('btcpButtonOverlay').style.transition = "all 0.05s ease-in-out";
        },300);
        setTimeout(function () {
            get('btcpButtonOverlay').style.paddingTop = ((topH > 0 ? topH : 0) + 40)+"px";
        },420);
    }
    if (vis === "hide") {
        get('btcpButtonOverlay').style.transition = "all 0.05s ease-in-out";
        get('btcpButtonOverlay').style.paddingTop = ((topH > 0 ? topH : 0) + 30)+"px";
        setTimeout(function () {
            get('btcpButtonOverlay').style.transition = "all 0.5s ease-in-out";
            get('btcpButtonOverlay').style.paddingTop = "1500px";
        },120);
        setTimeout(function () {
            get('btcpButtonOverlay').style.background = "rgba(0,0,0,0.01)";
        },320);
        setTimeout(function () {
            get('btcpButtonOverlay').style.display = "none";
        },620);
    }
    if (vis === "reposition" && get('btcpButtonOverlay') && get('btcpButtonOverlay').style.paddingTop !== "1500px") {
        get('btcpButtonOverlay').style.transition = "0";
        get('btcpButtonOverlay').style.paddingTop = ((topH > 0 ? topH : 0) + 30)+"px";
    }
    if (vis === "show-instant") {
        get('btcpButtonOverlay').style.transition = "0";
        get('btcpButtonOverlay').style.paddingTop = ((topH > 0 ? topH : 0) + 30)+"px";
        get('btcpButtonOverlay').style.background = "rgba(0,0,0,0.9)";
    }
}

// Add widget to merchants site
get(btcpWidgetID).insertAdjacentElement('afterend',widget);

// Handle socket comms for order confirmation response
btcpWidget.handlePaymentResponse = function(data) {
  // Hide overlay after 1 sec (the delay is less snappy)
  setTimeout(function() {
      btcpWidget.doOverlay('hide');
  },1000);
  // User confirmed payment approval
  if (data.result === 'success') {
      // Update button
      if (btcpWidgetData[btcpWidgetID]['logo']) {
          get('btcpButton').style.background = 'url(\'data:image/svg+xml;charset=UTF-8,'+btcpLogo+'\') no-repeat 5px 5px #080';
          get('btcpButton').style.backgroundSize = '24px 24px';
      } else {
          get('btcpButton').style.background = "#080";
      }
      setTimeout(function() {
          get('btcpButton').innerHTML = "Authorized, proceeding with order...";
      },2000);
      // Run success function and pass through data
      btcpWidget.onPaymentSuccess(data);
  }
  // User cancelled payment approval
  if (data.result === 'failed') {
      // Update button
      if (btcpWidgetData[btcpWidgetID]['logo']) {
          get('btcpButton').style.background = 'url(\'data:image/svg+xml;charset=UTF-8,'+btcpLogo+'\') no-repeat 5px 5px #b00';
          get('btcpButton').style.backgroundSize = '24px 24px';
      } else {
          get('btcpButton').style.background = "#b00";
      }
      setTimeout(function() {
          get('btcpButton').innerHTML = "Order cancelled...";
      },2000);
      // Run fail function and pass through data
      btcpWidget.onPaymentFail(
          {
              'reason' : 'Order cancelled'
          }
      );
      // Set button back to previous state so they could buy again
      setTimeout(function() {
          if (btcpWidgetData[btcpWidgetID]['logo']) {
              get('btcpButton').style.background = 'url(\'data:image/svg+xml;charset=UTF-8,'+btcpLogo+'\') no-repeat 5px 5px #272d63';
              get('btcpButton').style.backgroundSize = '24px 24px';
          } else {
              get('btcpButton').style.background = "#272d63";
          }
          setTimeout(function() {
              get('btcpButton').innerHTML = "Pay with $BTCP";
          },1000);
      },4000);
  }
};

btcpWidget.logoRightClicks = 0;
// Increment right mouse clicks on logo till 3
btcpWidget.incrLogoRightClicks = function(e) {
  if (btcpWidget.logoRightClicks == 2) {
      // Will be 3rd click in a moment, show merchant support
      btcpWidget.showMerchantSupportScreen();
  }
  btcpWidget.logoRightClicks += btcpWidget.logoRightClicks < 3 ? 1 : -2;
}

btcpWidget.getSetupInfo = function() {
    var date = new Date();
    var info = "<pre>"+
               "=============================\n=== BTCP Merchant Support ===\n===  Widget version v"+btcpWidget.version+"  ===\n===   Vendor Setup Info   ===\n=============================\n\n"+date+"\n\n\n\n"+
               "==========================\nbtcp_widget_data innerHTML\n==========================\n\n"+get('btcp_widget_data').innerHTML+"\n\n\n\n"+
               "===================\n"+btcpWidget.data.id+" script src\n===================\n\n"+get(btcpWidget.data.id).src+"\n\n\n\n"+
               "================\nnavigator object\n================\n\n"+btcpWidget.navigatorProperties()+"\n\n\n\n"+
               "=============\nwindow object\n=============\n\n"+btcpWidget.objToString(window);
    return info;
}

btcpWidget.objToString = function(obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}

btcpWidget.navigatorProperties = function(){
    var info = "";
    for(var property in navigator){ 
        var str = navigator[property]
        info += property+"::"+str+"\n";
    }
    return info;
}
btcpWidget.displayInfo = function() {
    var info = btcpWidget.getSetupInfo();
    window.open('about:blank').document.body.innerHTML = info;
}

window.addEventListener("resize", function(event) {
    btcpWidget.doOverlay('reposition');
});

const explorerLink = '<a href="https://explorer.btcprivate.org/address/'+address+'" target="_blank" style="text-decoration: none; color: #fff">[&gt;]</a>';
paidEnough = false;
numConfirms = 0;

const processPayment = function() {
    // Unsubsribe from websockets
    socket.emit('unsubscribe', 'bitcoind/hashblock');
    socket.emit('unsubscribe', 'bitcoind/addresstxid', [address]);

    // Setup a JSON response
    var jsonResponse = '{'+
            '"result"   : "success",'+
            '"token"    : "abcdef",'+
            '"txid"     : "'+btcpWidget.txID+'",'+
            '"confirms" : '+numConfirms+
         '}';
    // Handle the payment response with that JSON data
    btcpWidget.handlePaymentResponse(JSON.parse(jsonResponse));
}

var displayProcessingMessage = function() {
    get('payAmountText').style.display = "none";
    get('walletAddress').style.display = "none";
    get('walletAddressInput').style.display = "none";
    get('clipboardTooltip').style.display = "none";
    get('electrumButton').style.display = "none";
    get('walletWhat').style.display = "none";
    get('walletGet').style.display = "none";
    get('qrCodeHeading').style.display = "none";
    get('qrCode').style.display = "none";
    get('transactionRef').style.display = "block";
    get('orderProgressBarContainer').style.display = "block";
    get('orderProgressInfo').innerHTML = "BTCP payment recognised<br>Please wait for confirms... "+explorerLink;
    setTimeout(function() {
        get('orderProgressBar').style.width = ((1/(approvalConfirmsNeeded+1))*200) + "px";
    },200);
    if (approvalOnRecognition) {
        processPayment();
    }
}

// Load socket and Bitcore scripts
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = '//'+btcpWidget.scriptHost+'/socket.io/socket.io.js';
document.getElementsByTagName('head')[0].appendChild(script);
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = '//'+btcpWidget.scriptHost+'/store-demo/js/bitcore-lib-btcp/bitcore-lib-btcp.js';
document.getElementsByTagName('head')[0].appendChild(script);

    var cA = document.createElement("div");
    cA.id = "transactionRef";
    cA.style.display = "fixed";
    cA.style.top = "-1000px";
    cA.style.opacity = "0";
    cA.innerHTML = '<div id="wallet"></div><button class="copyButton" id="copyButtonId" data-id="@item.Type" data-clipboard-action="copy" data-clipboard-target="div#wallet">Copy!</button>';

document.getElementsByTagName('body')[0].appendChild(cA);

// On document load
window.onload = function() {
    get("wallet").innerHTML = address;
    bitcore = require('bitcore-lib-btcp');
    socket = io('http://'+btcpWidget.scriptHost);
    socket.emit('subscribe', 'bitcoind/hashblock');
    socket.emit('subscribe', 'bitcoind/rawtransaction');
    socket.emit('subscribe', 'bitcoind/addresstxid', [address]);

    // addresstxid subscription response
    socket.on('bitcoind/addresstxid', function(data) {
      // Get and confirm address
      var bitcoreAddress = bitcore.Address(data.address);
      if (bitcoreAddress.toString() == address && paidEnough) {
          // Set transaction ID and update progress info
          btcpWidget.txID = data.txid;
          displayProcessingMessage();
       }
    });

    // rawtransaction subscription response
    socket.on('bitcoind/rawtransaction', function(transactionHex) {
        if ("undefined" == typeof amountToPay) {
            amountToPay = amount;
        }
        // Get outputs from tx hex
        var o = bitcore.Transaction(transactionHex).outputs;
        // Cycle through and find our address in that tx block
        for (var i=0; i<o.length; i++) {
            if (bitcore.Address.fromScript(bitcore.Script.fromBuffer(o[i]._scriptBuffer)).toString() == address) {
                // Check user has paid correct amount
                // TODO: if not enough paid, display messaging that user needs to pay more
                // Paid too little (5000 sats or less under required amount)
                if (o[i].satoshis < amountToPay * (100000000 - 5000)) {
                    // Set amount to pay and alert user
                    amountToPay = (amountToPay - (o[i].satoshis / 100000000)).toFixed(8) * 1;
                    alert('You seem to have paid '+amountToPay+' BTCP too little.\n\nPlease pay this extra amount to continue.');
                    // Set params back to start point and new message
                    paidEnough = false;
                    numConfirms = 0;
                    get('orderProgressInfo').innerHTML = "Please pay remaining:<br>"+amountToPay+" BTCP to continue ";
                    get('payAmountText').innerHTML = 'Please pay <b>'+amountToPay+' BTCP</b> to wallet:'
                    // Set new URI
                    btcpWidget.btcpURI = 'bitcoin:'+encodeURI(btcpWidget.data.wallet)+
                        '?amount='+amountToPay+
                        '&message='+encodeURI(btcpWidget.data.description)+
                        '&r='+encodeURI(btcpWidget.getLocation(window.location).origin);
                    // Apply that to button and QR code
                    get('electrumButton').href = btcpWidget.btcpURI;
                    btcpWidget.generateQRCode(btcpWidget.btcpURI);
                // Paid too much (5000 sats or more under required amount)
                } else if (o[i].satoshis > amountToPay * (100000000 + 5000)) {
                    // Set amount overpaid and alert user
                    amountToPay = ((o[i].satoshis / 100000000) - amountToPay).toFixed(8) * 1;
                    alert('You seem to have paid '+amountToPay+' BTCP too much.\n\nPlease contact merchant to discuss any partial refund.');
                    // Permit order to proceed
                    paidEnough = true;
                    displayProcessingMessage();
                // Paid roughly right amount
                } else {
                    paidEnough = true;
                    displayProcessingMessage();
                }
                break;
            }
        }
    });

    // hashblock subscription response
    socket.on('bitcoind/hashblock', function(blockhashHex) {
        if (paidEnough) {
            // Increase number of confirms
            numConfirms++;
            // Display relevant message
            if (numConfirms === 0) {
                get('orderProgressInfo').innerHTML = "BTCP payment progress:<br>Received on block "+explorerLink;
            } else {
                get('orderProgressInfo').innerHTML = "BTCP payment progress:<br>"+numConfirms+" of "+approvalConfirmsNeeded+" confirms "+explorerLink;
                get('orderProgressBar').style.width = (((numConfirms+1)/(approvalConfirmsNeeded+1))*200) + "px";
            }
            // If at or above number of confirms needed for approval
            if (numConfirms >= approvalConfirmsNeeded) {
              processPayment();
            }
        }
    });
};
