////////////////////////
// BTCP Widget - v0.5 //
////////////////////////
btcpWidget.version = 0.5;

var jsonData = '{'+
        '"id"          : "widget_1",'+
        '"wallet"      : "'+address+'",'+
        '"amount"      : "'+amount+'",'+
        '"description" : "Pepperoni Pizza"'+
     '}';
// Handle the payment response with that JSON data
btcpWidget.data = JSON.parse(jsonData);

// Get hex string of UTC timestamp in ms as transaction ref
// TODO: needs more uniqueness. Also create at point payment received not on this JS script load
btcpWidget.transactionRef = Date.now().toString(16);

btcpWidget.getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

btcpURI = 'bitcoin:'+encodeURI(btcpWidget.data.wallet)+
          '?amount='+encodeURI(btcpWidget.data.amount)+
          '&message='+encodeURI(btcpWidget.data.description)+
          '&r='+encodeURI(btcpWidget.getLocation(window.location).origin);

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
    'widget_1' : {
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

// QR code size
qrCodeWidth = 128;
qrCodeHeight = 128;

var approvalOnRecognition = false;
var approvalConfirmsNeeded = 6;

// QR code generator
(function(r){r.fn.qrcode=function(h){var s;function u(a){this.mode=s;this.data=a}function o(a,c){this.typeNumber=a;this.errorCorrectLevel=c;this.modules=null;this.moduleCount=0;this.dataCache=null;this.dataList=[]}function q(a,c){if(void 0==a.length)throw Error(a.length+"/"+c);for(var d=0;d<a.length&&0==a[d];)d++;this.num=Array(a.length-d+c);for(var b=0;b<a.length-d;b++)this.num[b]=a[b+d]}function p(a,c){this.totalCount=a;this.dataCount=c}function t(){this.buffer=[];this.length=0}u.prototype={getLength:function(){return this.data.length},
write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}};o.prototype={addData:function(a){this.dataList.push(new u(a));this.dataCache=null},isDark:function(a,c){if(0>a||this.moduleCount<=a||0>c||this.moduleCount<=c)throw Error(a+","+c);return this.modules[a][c]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){for(var a=1,a=1;40>a;a++){for(var c=p.getRSBlocks(a,this.errorCorrectLevel),d=new t,b=0,e=0;e<c.length;e++)b+=c[e].dataCount;
for(e=0;e<this.dataList.length;e++)c=this.dataList[e],d.put(c.mode,4),d.put(c.getLength(),j.getLengthInBits(c.mode,a)),c.write(d);if(d.getLengthInBits()<=8*b)break}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17;this.modules=Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=Array(this.moduleCount);for(var b=0;b<this.moduleCount;b++)this.modules[d][b]=null}this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-
7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(a,c);7<=this.typeNumber&&this.setupTypeNumber(a);null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList));this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,c){for(var d=-1;7>=d;d++)if(!(-1>=a+d||this.moduleCount<=a+d))for(var b=-1;7>=b;b++)-1>=c+b||this.moduleCount<=c+b||(this.modules[a+d][c+b]=
0<=d&&6>=d&&(0==b||6==b)||0<=b&&6>=b&&(0==d||6==d)||2<=d&&4>=d&&2<=b&&4>=b?!0:!1)},getBestMaskPattern:function(){for(var a=0,c=0,d=0;8>d;d++){this.makeImpl(!0,d);var b=j.getLostPoint(this);if(0==d||a>b)a=b,c=d}return c},createMovieClip:function(a,c,d){a=a.createEmptyMovieClip(c,d);this.make();for(c=0;c<this.modules.length;c++)for(var d=1*c,b=0;b<this.modules[c].length;b++){var e=1*b;this.modules[c][b]&&(a.beginFill(0,100),a.moveTo(e,d),a.lineTo(e+1,d),a.lineTo(e+1,d+1),a.lineTo(e,d+1),a.endFill())}return a},
setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(a=8;a<this.moduleCount-8;a++)null==this.modules[6][a]&&(this.modules[6][a]=0==a%2)},setupPositionAdjustPattern:function(){for(var a=j.getPatternPosition(this.typeNumber),c=0;c<a.length;c++)for(var d=0;d<a.length;d++){var b=a[c],e=a[d];if(null==this.modules[b][e])for(var f=-2;2>=f;f++)for(var i=-2;2>=i;i++)this.modules[b+f][e+i]=-2==f||2==f||-2==i||2==i||0==f&&0==i?!0:!1}},setupTypeNumber:function(a){for(var c=
j.getBCHTypeNumber(this.typeNumber),d=0;18>d;d++){var b=!a&&1==(c>>d&1);this.modules[Math.floor(d/3)][d%3+this.moduleCount-8-3]=b}for(d=0;18>d;d++)b=!a&&1==(c>>d&1),this.modules[d%3+this.moduleCount-8-3][Math.floor(d/3)]=b},setupTypeInfo:function(a,c){for(var d=j.getBCHTypeInfo(this.errorCorrectLevel<<3|c),b=0;15>b;b++){var e=!a&&1==(d>>b&1);6>b?this.modules[b][8]=e:8>b?this.modules[b+1][8]=e:this.modules[this.moduleCount-15+b][8]=e}for(b=0;15>b;b++)e=!a&&1==(d>>b&1),8>b?this.modules[8][this.moduleCount-
b-1]=e:9>b?this.modules[8][15-b-1+1]=e:this.modules[8][15-b-1]=e;this.modules[this.moduleCount-8][8]=!a},mapData:function(a,c){for(var d=-1,b=this.moduleCount-1,e=7,f=0,i=this.moduleCount-1;0<i;i-=2)for(6==i&&i--;;){for(var g=0;2>g;g++)if(null==this.modules[b][i-g]){var n=!1;f<a.length&&(n=1==(a[f]>>>e&1));j.getMask(c,b,i-g)&&(n=!n);this.modules[b][i-g]=n;e--; -1==e&&(f++,e=7)}b+=d;if(0>b||this.moduleCount<=b){b-=d;d=-d;break}}}};o.PAD0=236;o.PAD1=17;o.createData=function(a,c,d){for(var c=p.getRSBlocks(a,
c),b=new t,e=0;e<d.length;e++){var f=d[e];b.put(f.mode,4);b.put(f.getLength(),j.getLengthInBits(f.mode,a));f.write(b)}for(e=a=0;e<c.length;e++)a+=c[e].dataCount;if(b.getLengthInBits()>8*a)throw Error("code length overflow. ("+b.getLengthInBits()+">"+8*a+")");for(b.getLengthInBits()+4<=8*a&&b.put(0,4);0!=b.getLengthInBits()%8;)b.putBit(!1);for(;!(b.getLengthInBits()>=8*a);){b.put(o.PAD0,8);if(b.getLengthInBits()>=8*a)break;b.put(o.PAD1,8)}return o.createBytes(b,c)};o.createBytes=function(a,c){for(var d=
0,b=0,e=0,f=Array(c.length),i=Array(c.length),g=0;g<c.length;g++){var n=c[g].dataCount,h=c[g].totalCount-n,b=Math.max(b,n),e=Math.max(e,h);f[g]=Array(n);for(var k=0;k<f[g].length;k++)f[g][k]=255&a.buffer[k+d];d+=n;k=j.getErrorCorrectPolynomial(h);n=(new q(f[g],k.getLength()-1)).mod(k);i[g]=Array(k.getLength()-1);for(k=0;k<i[g].length;k++)h=k+n.getLength()-i[g].length,i[g][k]=0<=h?n.get(h):0}for(k=g=0;k<c.length;k++)g+=c[k].totalCount;d=Array(g);for(k=n=0;k<b;k++)for(g=0;g<c.length;g++)k<f[g].length&&
(d[n++]=f[g][k]);for(k=0;k<e;k++)for(g=0;g<c.length;g++)k<i[g].length&&(d[n++]=i[g][k]);return d};s=4;for(var j={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,
78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var c=a<<10;0<=j.getBCHDigit(c)-j.getBCHDigit(j.G15);)c^=j.G15<<j.getBCHDigit(c)-j.getBCHDigit(j.G15);return(a<<10|c)^j.G15_MASK},getBCHTypeNumber:function(a){for(var c=a<<12;0<=j.getBCHDigit(c)-
j.getBCHDigit(j.G18);)c^=j.G18<<j.getBCHDigit(c)-j.getBCHDigit(j.G18);return a<<12|c},getBCHDigit:function(a){for(var c=0;0!=a;)c++,a>>>=1;return c},getPatternPosition:function(a){return j.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,c,d){switch(a){case 0:return 0==(c+d)%2;case 1:return 0==c%2;case 2:return 0==d%3;case 3:return 0==(c+d)%3;case 4:return 0==(Math.floor(c/2)+Math.floor(d/3))%2;case 5:return 0==c*d%2+c*d%3;case 6:return 0==(c*d%2+c*d%3)%2;case 7:return 0==(c*d%3+(c+d)%2)%2;default:throw Error("bad maskPattern:"+
a);}},getErrorCorrectPolynomial:function(a){for(var c=new q([1],0),d=0;d<a;d++)c=c.multiply(new q([1,l.gexp(d)],0));return c},getLengthInBits:function(a,c){if(1<=c&&10>c)switch(a){case 1:return 10;case 2:return 9;case s:return 8;case 8:return 8;default:throw Error("mode:"+a);}else if(27>c)switch(a){case 1:return 12;case 2:return 11;case s:return 16;case 8:return 10;default:throw Error("mode:"+a);}else if(41>c)switch(a){case 1:return 14;case 2:return 13;case s:return 16;case 8:return 12;default:throw Error("mode:"+
a);}else throw Error("type:"+c);},getLostPoint:function(a){for(var c=a.getModuleCount(),d=0,b=0;b<c;b++)for(var e=0;e<c;e++){for(var f=0,i=a.isDark(b,e),g=-1;1>=g;g++)if(!(0>b+g||c<=b+g))for(var h=-1;1>=h;h++)0>e+h||c<=e+h||0==g&&0==h||i==a.isDark(b+g,e+h)&&f++;5<f&&(d+=3+f-5)}for(b=0;b<c-1;b++)for(e=0;e<c-1;e++)if(f=0,a.isDark(b,e)&&f++,a.isDark(b+1,e)&&f++,a.isDark(b,e+1)&&f++,a.isDark(b+1,e+1)&&f++,0==f||4==f)d+=3;for(b=0;b<c;b++)for(e=0;e<c-6;e++)a.isDark(b,e)&&!a.isDark(b,e+1)&&a.isDark(b,e+
2)&&a.isDark(b,e+3)&&a.isDark(b,e+4)&&!a.isDark(b,e+5)&&a.isDark(b,e+6)&&(d+=40);for(e=0;e<c;e++)for(b=0;b<c-6;b++)a.isDark(b,e)&&!a.isDark(b+1,e)&&a.isDark(b+2,e)&&a.isDark(b+3,e)&&a.isDark(b+4,e)&&!a.isDark(b+5,e)&&a.isDark(b+6,e)&&(d+=40);for(e=f=0;e<c;e++)for(b=0;b<c;b++)a.isDark(b,e)&&f++;a=Math.abs(100*f/c/c-50)/5;return d+10*a}},l={glog:function(a){if(1>a)throw Error("glog("+a+")");return l.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;256<=a;)a-=255;return l.EXP_TABLE[a]},EXP_TABLE:Array(256),
LOG_TABLE:Array(256)},m=0;8>m;m++)l.EXP_TABLE[m]=1<<m;for(m=8;256>m;m++)l.EXP_TABLE[m]=l.EXP_TABLE[m-4]^l.EXP_TABLE[m-5]^l.EXP_TABLE[m-6]^l.EXP_TABLE[m-8];for(m=0;255>m;m++)l.LOG_TABLE[l.EXP_TABLE[m]]=m;q.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=Array(this.getLength()+a.getLength()-1),d=0;d<this.getLength();d++)for(var b=0;b<a.getLength();b++)c[d+b]^=l.gexp(l.glog(this.get(d))+l.glog(a.get(b)));return new q(c,0)},mod:function(a){if(0>
this.getLength()-a.getLength())return this;for(var c=l.glog(this.get(0))-l.glog(a.get(0)),d=Array(this.getLength()),b=0;b<this.getLength();b++)d[b]=this.get(b);for(b=0;b<a.getLength();b++)d[b]^=l.gexp(l.glog(a.get(b))+c);return(new q(d,0)).mod(a)}};p.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],
[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,
116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,
43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,
3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,
55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,
45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];p.getRSBlocks=function(a,c){var d=p.getRsBlockTable(a,c);if(void 0==d)throw Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var b=d.length/3,e=[],f=0;f<b;f++)for(var h=d[3*f+0],g=d[3*f+1],j=d[3*f+2],l=0;l<h;l++)e.push(new p(g,j));return e};p.getRsBlockTable=function(a,c){switch(c){case 1:return p.RS_BLOCK_TABLE[4*(a-1)+0];case 0:return p.RS_BLOCK_TABLE[4*(a-1)+1];case 3:return p.RS_BLOCK_TABLE[4*
(a-1)+2];case 2:return p.RS_BLOCK_TABLE[4*(a-1)+3]}};t.prototype={get:function(a){return 1==(this.buffer[Math.floor(a/8)]>>>7-a%8&1)},put:function(a,c){for(var d=0;d<c;d++)this.putBit(1==(a>>>c-d-1&1))},getLengthInBits:function(){return this.length},putBit:function(a){var c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0);a&&(this.buffer[c]|=128>>>this.length%8);this.length++}};"string"===typeof h&&(h={text:h});h=r.extend({},{render:"canvas",width:qrCodeWidth,height:qrCodeHeight,typeNumber:-1,
correctLevel:2,background:"#ffffff",foreground:"#000000"},h);return this.each(function(){var a;if("canvas"==h.render){a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();var c=document.createElement("canvas");c.width=h.width;c.height=h.height;for(var d=c.getContext("2d"),b=h.width/a.getModuleCount(),e=h.height/a.getModuleCount(),f=0;f<a.getModuleCount();f++)for(var i=0;i<a.getModuleCount();i++){d.fillStyle=a.isDark(f,i)?h.foreground:h.background;var g=Math.ceil((i+1)*b)-Math.floor(i*b),
j=Math.ceil((f+1)*b)-Math.floor(f*b);d.fillRect(Math.round(i*b),Math.round(f*e),g,j)}}else{a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();c=r("<table></table>").css("width",h.width+"px").css("height",h.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",h.background);d=h.width/a.getModuleCount();b=h.height/a.getModuleCount();for(e=0;e<a.getModuleCount();e++){f=r("<tr></tr>").css("height",b+"px").appendTo(c);for(i=0;i<a.getModuleCount();i++)r("<td></td>").css("width",
d+"px").css("background-color",a.isDark(e,i)?h.foreground:h.background).appendTo(f)}}a=c;jQuery(a).appendTo(this)})}})(jQuery);

// SVG BTCP logo
btcpLogo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-678 877.2 226.8 226.8"><switch><g><path d="M-564.6 877.2c-62.6 0-113.4 50.8-113.4 113.4s50.8 113.4 113.4 113.4c62.6 0 113.4-50.8 113.4-113.4S-502 877.2-564.6 877.2zm58.6 154.5c-8.1 23.3-27.4 25.2-53.1 20.4l-6.2 25-14.9-3.7 5.8-23.9.2-.8 4.5-18.4c13.3 3 31.3 4.8 34.8-9 1.8-7.4-1.7-12.7-7.4-16.6 2-.1 3.9-.2 5.9-.3 4.3-.2 6.4-.5 10.6-1.3 4.3-.7 9.4-2.4 13-3.7.2-.1.3-.1.5-.2 7.7 6.9 11.4 18.1 6.3 32.5zm5.4-58.3c-.8 5.6-2.8 11.1-6.7 15.3-3.4 3.6-8.7 5.5-13.3 7-5.4 1.8-11.2 2.9-16.9 2.9-3.8 0-7.7-.1-11.5-.4-6.2-.5-12.6-1-18.7-2.4-2-.5-3.7-.8-5.5-1.3l-8.3 33.2-4.9 18.1-6.2 24.8-15-3.8 6.2-25.1c-3.5-.9-7.1-1.9-10.7-2.8l-19.6-4.9 7.5-17.3s11.1 3 11 2.7c4.3 1.1 6.2-1.7 6.9-3.6l8.5-34 3.9-15.8 4.5-18.1c.2-3.2-.9-7.2-7-8.8.2-.2-10.9-2.7-10.9-2.7l4-16.1 20.8 5.3c3.1.8 6.3 1.5 9.6 2.3l6.2-24.8 15.1 3.8-6 24.3c4 .9 8.1 1.9 12.1 2.8l6-24.1 15.1 3.8-6.2 24.8c18.8 6.8 32.8 16.6 30 34.9zm-61.2-24.1l-7.5 30.1c8.5 2.1 34.7 10.8 39-6.3 4.4-17.7-23-21.7-31.5-23.8z" fill="white" /></g></switch></svg>';

btcpLogoFull = '<?xml version="1.0" encoding="UTF-8"?><svg version="1.1" viewBox="0 0 799 145" xmlns="http://www.w3.org/2000/svg"><title>logo</title><desc>Created with Sketch.</desc><g transform="translate(-200 -127)" fill="none" fill-rule="evenodd"><g transform="translate(200 127)"><path d="m142.12 90.165c-9.6099 38.596-48.653 62.083-87.204 52.459-38.536-9.6238-61.997-48.714-52.38-87.307 9.6055-38.598 48.648-62.087 87.188-52.466 38.549 9.6216 62.006 48.718 52.396 87.314" fill="#272D63"/><path d="m98.006 81.934c-2.7007 0.46598-4.0402 0.641-6.7737 0.8007-1.2477 0.074382-2.4997 0.15314-3.7539 0.22096 3.6272 2.4874 5.8997 5.8871 4.7219 10.615-2.196 8.8274-13.713 7.6286-22.231 5.7362l-2.8646 11.737h0.0021851l-0.12892 0.51411-3.7321 15.279 9.5575 2.3846 3.9856-15.988c16.421 3.1109 28.769 1.853 33.965-13.017 3.2339-9.2431 0.89151-16.364-4.1123-20.794-0.10707 0.052505-0.21414 0.10063-0.31684 0.13783-2.3249 0.84008-5.5959 1.9055-8.3185 2.3737" fill="#FEFEFE"/><path d="m95.178 62.507c-2.716 10.893-19.473 5.3577-24.91 4.0013l4.794-19.25c5.4364 1.3564 22.943 3.8898 20.116 15.248m3.6644-37.837l-9.6296-2.4043-3.8392 15.421c-2.5325-0.63006-5.1327-1.2251-7.7176-1.8158l3.8676-15.524-9.623-2.4021-3.9462 15.833c-2.0955-0.47692-4.1516-0.94947-6.1488-1.4461l-13.27-3.3691-2.5631 10.298s7.1452 1.6386 6.9966 1.7414c3.8982 0.97353 4.6039 3.5572 4.4859 5.6049l-2.8799 11.566-2.5085 10.074-5.4168 21.748c-0.47853 1.1879-1.6869 2.9687-4.4138 2.2905 0.096143 0.1422-7.0009-1.748-7.0009-1.748l-4.7787 11.035 12.531 3.1284c2.3315 0.58631 4.6149 1.1989 6.8633 1.7764l-3.9834 16.018 9.6165 2.4043 3.9484-15.852 3.129-11.599 5.2879-21.225c1.1122 0.27128 2.2244 0.51411 3.4895 0.80289 3.885 0.90571 7.9624 1.2404 11.928 1.538 2.4385 0.18158 4.8858 0.30409 7.3309 0.27346 3.6447-0.045942 7.3637-0.72632 10.81-1.8814 2.893-0.96697 6.3345-2.2052 8.4824-4.487 2.5128-2.669 3.7758-6.2153 4.3111-9.79 1.7459-11.693-7.1452-17.979-19.303-22.17l3.944-15.839z" fill="#FEFEFE"/><g transform="translate(170.98 31.405)"><path d="m363.8 5.8648c8.5041 0 14.917 1.606 19.24 4.8179 4.3223 3.212 6.4835 7.8902 6.4835 14.035 0 4.7481-0.89608 8.8503-2.6883 12.307-1.7922 3.4564-4.3399 6.3017-7.6431 8.5361-3.3032 2.2344-7.2741 3.8927-11.913 4.975-4.6386 1.0823-9.8042 1.6234-15.497 1.6234h-7.2741l-6.5362 27.022h-10.226l17.289-71.641c2.9518-0.69825 6.0793-1.1521 9.3826-1.3616 3.3032-0.20948 6.4307-0.31421 9.3826-0.31421zm-1.2651 8.5885c-4.99 0-8.0121 0.13965-9.0663 0.41895l-6.9579 28.803h6.6416c2.9518 0 5.9739-0.26184 9.0663-0.78553 3.0924-0.52369 5.8685-1.4489 8.3284-2.7755s4.4804-3.1596 6.0618-5.4987c1.5813-2.3392 2.372-5.3591 2.372-9.0598 0-3.98-1.4759-6.8254-4.4277-8.5361-2.9518-1.7107-6.9578-2.5661-12.018-2.5661zm53.906 9.1122c0.84338 0 1.7922 0.034912 2.8464 0.10474 1.0542 0.069826 2.0909 0.19202 3.11 0.36658 1.0191 0.17456 1.9503 0.34912 2.7937 0.52369 0.84338 0.17456 1.4759 0.36658 1.8976 0.57606l-2.8464 8.4837c-1.4056-0.5586-3.0221-0.97755-4.8494-1.2569-1.8273-0.2793-3.5843-0.41895-5.2711-0.41895-1.4759 0-2.9342 0.10474-4.375 0.31421-1.4408 0.20948-2.6883 0.48877-3.7425 0.8379l-11.175 46.085h-9.8043l12.651-52.369c2.8113-0.97756 5.8333-1.7631 9.0663-2.3566s6.4659-0.89027 9.6988-0.89027zm13.213 55.616h-9.8043l13.178-54.464h9.8043l-13.178 54.464zm11.386-64.309c-1.6165 0-2.9694-0.48877-4.0588-1.4663s-1.634-2.3391-1.634-4.0848c0-2.2344 0.70281-3.9975 2.1084-5.2892s2.987-1.9376 4.744-1.9376c1.6165 0 2.987 0.50623 4.1115 1.5187s1.6868 2.4264 1.6868 4.2419c0 2.0948-0.73795 3.788-2.2139 5.0798-1.4759 1.2918-3.0572 1.9376-4.744 1.9376zm13.002 64.309c-0.84338-3.5611-1.6516-7.4713-2.4247-11.731-0.7731-4.2594-1.4759-8.7107-2.1084-13.354s-1.1596-9.4438-1.5813-14.401c-0.42169-4.9576-0.70281-9.95-0.84338-14.977h9.9097c0.070282 3.4214 0.22841 7.0698 0.4744 10.945 0.24599 3.8753 0.54468 7.7506 0.89609 11.626 0.35141 3.8753 0.77309 7.6109 1.2651 11.207 0.49197 3.596 1.0191 6.8603 1.5813 9.793 2.1085-2.6534 4.3047-5.778 6.5889-9.374 2.2842-3.596 4.4804-7.3665 6.5889-11.312s4.0412-7.9077 5.7982-11.888 3.1627-7.6458 4.2169-10.997h9.9097c-1.5462 4.6085-3.5141 9.3914-5.9036 14.349-2.3896 4.9576-4.9724 9.8279-7.7485 14.611-2.7761 4.783-5.6928 9.374-8.75 13.773-3.0573 4.399-6.0266 8.3092-8.9082 11.731h-8.9609zm71.511 0.62843c-0.35141-0.76808-0.70281-1.6234-1.0542-2.5661-0.35141-0.94264-0.63253-1.9376-0.84338-2.985-1.5462 1.3965-3.6195 2.793-6.2199 4.1895-2.6004 1.3965-5.7982 2.0948-9.5934 2.0948-3.0924 0-5.7455-0.48877-7.9594-1.4663s-4.0236-2.3391-5.4292-4.0848-2.4423-3.8055-3.11-6.1795c-0.66768-2.3741-1.0015-4.9925-1.0015-7.8553 0-4.6783 0.79066-9.2518 2.372-13.721 1.5813-4.4688 3.9533-8.4488 7.116-11.94s7.1335-6.3192 11.913-8.4837c4.7792-2.1646 10.366-3.2469 16.762-3.2469 1.8976 0 4.1115 0.20947 6.6416 0.62843 2.5301 0.41895 4.7088 1.1172 6.5362 2.0948l-8.1175 32.888c-0.35141 1.606-0.6501 3.1421-0.89609 4.6085-0.24599 1.4663-0.36898 3.0025-0.36898 4.6085 0 1.606 0.14056 3.2294 0.42169 4.8703 0.28113 1.6409 0.77309 3.404 1.4759 5.2892l-8.6446 1.2569zm-15.708-7.5411c2.9518 0 5.4819-0.62842 7.5904-1.8853 2.1085-1.2569 3.9358-2.7232 5.482-4.399 0.070282-1.187 0.19327-2.4264 0.36898-3.7182 0.1757-1.2918 0.40412-2.601 0.68524-3.9277l6.3253-25.975c-0.35141-0.13965-0.93123-0.24439-1.7395-0.31421-0.80824-0.069825-1.5286-0.10474-2.1612-0.10474-4.0061 0-7.6255 0.76807-10.858 2.3042-3.233 1.5362-5.9915 3.5785-8.2756 6.1272-2.2842 2.5486-4.0412 5.5162-5.2711 8.9027-1.2299 3.3865-1.8449 6.9301-1.8449 10.631 0 1.4663 0.14056 2.9501 0.42169 4.4513s0.79066 2.8279 1.5286 3.98c0.73796 1.1521 1.7219 2.0947 2.9518 2.8279 1.2299 0.73317 2.8288 1.0997 4.7967 1.0997zm49.9 8.379c-5.2711 0-9.1366-1.1521-11.596-3.4563s-3.6898-5.6558-3.6898-10.055c0-2.8628 0.49197-6.5286 1.4759-10.997l11.28-46.608 10.226-1.6758-4.1115 16.863h18.66l-2.003 8.1695h-18.66l-5.7982 24.09c-0.84338 3.2818-1.2651 6.1446-1.2651 8.5885 0 2.3042 0.63253 3.9626 1.8976 4.975 1.2651 1.0125 3.3735 1.5187 6.3253 1.5187 2.0382 0 4.0412-0.33167 6.0091-0.99501 1.9679-0.66334 3.4789-1.2743 4.5332-1.8329l0.73796 8.2743c-1.0542 0.62843-2.8464 1.3092-5.3765 2.0424-2.5301 0.73317-5.4117 1.0997-8.6446 1.0997zm30.818-30.06c4.0763-0.13965 7.8012-0.40149 11.175-0.78553 3.3735-0.38404 6.2902-1.0474 8.75-1.99 2.4599-0.94264 4.375-2.2169 5.7455-3.8229 1.3705-1.606 2.0557-3.7007 2.0557-6.2843 0-0.62843-0.12299-1.2918-0.36898-1.99-0.24599-0.69825-0.66767-1.3441-1.2651-1.9376-0.5974-0.59352-1.4232-1.0823-2.4774-1.4663-1.0542-0.38404-2.3544-0.57606-3.9006-0.57606-2.4599 0-4.7616 0.52368-6.9052 1.5711s-4.0587 2.4264-5.7455 4.1371-3.1275 3.7007-4.3223 5.97c-1.1948 2.2693-2.1084 4.6608-2.741 7.1745zm10.015 29.955c-3.5844 0-6.6767-0.50623-9.2772-1.5187-2.6004-1.0125-4.7791-2.409-6.5362-4.1895s-3.0572-3.8578-3.9006-6.2319c-0.84338-2.3741-1.2651-4.8877-1.2651-7.5411 0-4.8878 0.73795-9.6009 2.2139-14.14 1.4759-4.5387 3.5843-8.5536 6.3253-12.045s6.0793-6.2668 10.015-8.3266c3.9358-2.0598 8.3986-3.0898 13.389-3.0898 2.8816 0 5.359 0.36658 7.4323 1.0997 2.0733 0.73317 3.7601 1.7282 5.0603 2.985s2.2666 2.7057 2.8991 4.3466c0.63254 1.6409 0.9488 3.3341 0.9488 5.0798 0 3.2818-0.59739 6.0573-1.7922 8.3266-1.1948 2.2693-2.7761 4.172-4.744 5.7082-1.9679 1.5362-4.2696 2.7232-6.9052 3.5611-2.6356 0.83791-5.3765 1.5012-8.2229 1.99s-5.7279 0.82044-8.6446 0.99501c-2.9167 0.17456-5.6752 0.33167-8.2756 0.47132-0.070282 0.5586-0.10542 1.0125-0.10542 1.3616v0.8379c0 1.606 0.19327 3.1247 0.57982 4.5561s1.1069 2.6883 2.1612 3.7706c1.0542 1.0823 2.5126 1.9376 4.375 2.5661 1.8625 0.62843 4.3047 0.94264 7.3268 0.94264 1.3354 0 2.7234-0.12219 4.1642-0.36658 1.4408-0.24439 2.8113-0.5586 4.1115-0.94264s2.4598-0.76807 3.4789-1.1521c1.0191-0.38404 1.7395-0.75062 2.1612-1.0997l0.84338 8.2743c-1.4056 0.76808-3.6722 1.5885-6.7997 2.4613s-6.7997 1.3092-11.017 1.3092z" fill="#75A0D5"/><path d="m24.985 81.172c-4.2169 0-8.5392-0.17456-12.967-0.52369-4.4278-0.34913-8.4338-0.90772-12.018-1.6758l16.868-70.174c4.0061-0.76808 8.2053-1.2918 12.598-1.5711s8.4162-0.41895 12.071-0.41895c4.2169 0 7.8539 0.4364 10.911 1.3092 3.0573 0.87282 5.5522 2.0424 7.485 3.5087s3.3735 3.1945 4.3223 5.1845 1.4232 4.1022 1.4232 6.3366c0 1.5362-0.15813 3.1421-0.4744 4.8179-0.31627 1.6758-0.94879 3.3341-1.8976 4.975-0.9488 1.6409-2.249 3.1945-3.9006 4.6608s-3.8128 2.793-6.4835 3.98c3.1627 1.3965 5.4819 3.2992 6.9579 5.7082s2.2139 5.0798 2.2139 8.0124c0 3.3516-0.66767 6.581-2.003 9.6882s-3.4789 5.8653-6.4308 8.2743-6.7821 4.3291-11.491 5.7606c-4.7089 1.4314-10.437 2.1471-17.184 2.1471zm-1.4759-32.678l-4.5332 18.853c1.1245 0.20948 2.5477 0.36658 4.2696 0.47132 1.7219 0.10474 3.3208 0.15711 4.7967 0.15711 2.1085 0 4.1993-0.1571 6.2726-0.47132s3.9358-0.89027 5.5874-1.7282c1.6516-0.83791 3.0045-1.99 4.0588-3.4563s1.5813-3.3516 1.5813-5.6558c0-0.97756-0.19327-1.9551-0.57982-2.9327-0.38655-0.97756-1.0015-1.8504-1.8449-2.6184-0.84338-0.76808-1.9503-1.3965-3.3208-1.8853s-3.0045-0.73316-4.9021-0.73316h-11.386zm3.0572-12.254h10.331c4.2169 0 7.362-0.90772 9.4353-2.7232 2.0733-1.8155 3.11-3.98 3.11-6.4937 0-1.3267-0.29869-2.4613-0.89609-3.404-0.5974-0.94264-1.3881-1.6933-2.372-2.2519s-2.1084-0.96009-3.3735-1.2045-2.5653-0.36658-3.9006-0.36658c-1.4759 0-3.0572 0.052368-4.744 0.15711s-2.9518 0.22693-3.7952 0.36658l-3.7952 15.92zm53.484 43.99h-15.602l13.178-55.092h15.708l-13.283 55.092zm7.5904-61.795c-2.1787 0-4.1466-0.64588-5.9036-1.9376-1.757-1.2918-2.6356-3.2643-2.6356-5.9177 0-1.4663 0.29869-2.8454 0.89609-4.1371 0.5974-1.2918 1.3881-2.409 2.372-3.3516s2.126-1.6933 3.4262-2.2519c1.3002-0.5586 2.6883-0.8379 4.1642-0.8379 2.1787 0 4.1466 0.64588 5.9036 1.9376 1.757 1.2918 2.6356 3.2643 2.6356 5.9177 0 1.4663-0.29869 2.8454-0.89609 4.1371-0.5974 1.2918-1.3881 2.409-2.372 3.3516-0.98395 0.94264-2.126 1.6933-3.4262 2.2519s-2.6883 0.8379-4.1642 0.8379zm17.324-7.0174l16.34-2.5137-4.006 16.234h17.5l-3.1627 12.778h-17.395l-4.6386 19.272c-0.42169 1.606-0.68524 3.1072-0.79067 4.5037s0.070279 2.601 0.52711 3.6134c0.45683 1.0125 1.2475 1.798 2.372 2.3566s2.6707 0.8379 4.6386 0.8379c1.6868 0 3.3208-0.1571 4.9021-0.47132 1.5813-0.31421 3.1802-0.75062 4.7967-1.3092l1.1596 11.94c-2.1085 0.76808-4.3926 1.4314-6.8524 1.99s-5.3765 0.8379-8.75 0.8379c-4.8494 0-8.6095-0.7157-11.28-2.1471-2.6707-1.4314-4.5683-3.3865-5.6928-5.8653-1.1245-2.4788-1.6165-5.3241-1.4759-8.5361s0.63253-6.5985 1.4759-10.16l10.331-43.361zm25.969 46.818c0-4.7481 0.77309-9.2169 2.3193-13.406 1.5462-4.1895 3.76-7.8553 6.6416-10.997 2.8816-3.1421 6.378-5.6209 10.49-7.4364 4.1115-1.8155 8.6973-2.7232 13.758-2.7232 3.1627 0 5.9915 0.29675 8.4865 0.89027 2.495 0.59352 4.7616 1.379 6.7997 2.3566l-5.3765 12.15c-1.4056-0.5586-2.864-1.0648-4.375-1.5187-1.5111-0.45387-3.3559-0.68079-5.5347-0.68079-5.2711 0-9.4177 1.7631-12.44 5.2892-3.0221 3.5262-4.5332 8.3266-4.5332 14.401 0 3.5611 0.77309 6.4414 2.3193 8.6409 1.5462 2.1995 4.3926 3.2992 8.5392 3.2992 2.0382 0 4.006-0.20947 5.9036-0.62843 1.8976-0.41895 3.5843-0.94264 5.0603-1.5711l1.1596 12.464c-1.9679 0.76808-4.129 1.4489-6.4835 2.0424-2.3544 0.59352-5.2184 0.89027-8.5919 0.89027-4.3575 0-8.0472-0.62842-11.069-1.8853-3.0221-1.2569-5.5171-2.9501-7.485-5.0798-1.9679-2.1297-3.3911-4.6259-4.2696-7.4887-0.87852-2.8628-1.3178-5.8653-1.3178-9.0074zm65.502 23.461c-3.7249 0-6.9578-0.5586-9.6988-1.6758-2.741-1.1172-5.0075-2.6883-6.7997-4.7132-1.7922-2.0249-3.1451-4.4164-4.0588-7.1745-0.91366-2.7581-1.3705-5.8129-1.3705-9.1645 0-4.1895 0.68524-8.379 2.0557-12.569 1.3705-4.1895 3.3911-7.96 6.0618-11.312 2.6707-3.3516 5.9388-6.0922 9.8043-8.2219 3.8655-2.1297 8.2932-3.1945 13.283-3.1945 3.6547 0 6.87 0.5586 9.6461 1.6758 2.7761 1.1172 5.0603 2.6883 6.8524 4.7132 1.7922 2.0249 3.1451 4.4164 4.0588 7.1745 0.91366 2.7581 1.3705 5.8129 1.3705 9.1645 0 4.1895-0.66767 8.379-2.003 12.569-1.3354 4.1895-3.3032 7.96-5.9036 11.312-2.6004 3.3516-5.8509 6.0922-9.7516 8.2219-3.9006 2.1297-8.4162 3.1945-13.547 3.1945zm7.8012-44.828c-2.3193 0-4.3574 0.66333-6.1145 1.99-1.757 1.3267-3.2329 3.0025-4.4277 5.0274s-2.0909 4.2419-2.6883 6.6508c-0.5974 2.409-0.89609 4.6957-0.89609 6.8603 0 3.5611 0.56225 6.3017 1.6868 8.2219s3.1626 2.8803 6.1145 2.8803c2.3193 0 4.3574-0.66333 6.1145-1.99s3.2329-3.0025 4.4277-5.0274 2.0909-4.2419 2.6883-6.6508c0.5974-2.409 0.89609-4.6957 0.89609-6.8603 0-3.5611-0.56225-6.3017-1.6868-8.2219-1.1245-1.9202-3.1626-2.8803-6.1145-2.8803zm38.83 43.361h-15.602l13.178-55.092h15.708l-13.283 55.092zm7.5904-61.795c-2.1787 0-4.1466-0.64588-5.9036-1.9376-1.757-1.2918-2.6356-3.2643-2.6356-5.9177 0-1.4663 0.29869-2.8454 0.89609-4.1371 0.5974-1.2918 1.3881-2.409 2.372-3.3516s2.126-1.6933 3.4262-2.2519c1.3002-0.5586 2.6883-0.8379 4.1642-0.8379 2.1787 0 4.1466 0.64588 5.9036 1.9376 1.757 1.2918 2.6356 3.2643 2.6356 5.9177 0 1.4663-0.29869 2.8454-0.89609 4.1371-0.5974 1.2918-1.3881 2.409-2.372 3.3516-0.98394 0.94264-2.126 1.6933-3.4262 2.2519-1.3002 0.5586-2.6883 0.8379-4.1642 0.8379zm15.005 9.2169c1.1948-0.34913 2.5126-0.75062 3.9533-1.2045 1.4408-0.45387 3.0572-0.87281 4.8494-1.2569 1.7922-0.38404 3.7952-0.69825 6.0091-0.94264s4.7264-0.36658 7.5377-0.36658c8.2933 0 13.986 2.374 17.078 7.1222 3.0924 4.7481 3.6195 11.242 1.5813 19.481l-7.1687 29.745h-15.708l6.9579-29.117c0.42169-1.8155 0.75552-3.5785 1.0015-5.2892 0.24599-1.7107 0.22842-3.2119-0.052711-4.5037-0.28113-1.2918-0.93122-2.3391-1.9503-3.1421s-2.5828-1.2045-4.6913-1.2045c-2.0382 0-4.1115 0.20947-6.2199 0.62843l-10.226 42.628h-15.708l12.756-52.578z" fill="#272D63"/></g></g></g></svg>';

clipboardIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M779.5,82.6h-76.2V64.4c0-29-29-54.4-65.3-54.4H365.7c-36.3,0-65.3,25.4-65.3,54.4v18.1h-79.9c-36.3,0-65.3,29-65.3,65.3v776.7c0,36.3,29,65.3,65.3,65.3h559c36.3,0,65.3-29,65.3-69V147.9C844.8,111.6,815.8,82.6,779.5,82.6z M333,64.4c0-10.9,14.5-18.1,29-18.1h272.2c14.5,0,29,7.3,29,18.1v90.7H336.7H333V64.4z M808.5,921c0,14.5-14.5,29-29,29h-559c-14.5,0-29-10.9-29-29V147.9c0-14.5,14.5-29,29-29h79.9v72.6h399.3h3.6v-72.6h76.2c14.5,0,29,10.9,29,29V921z" fill="white"/></g></svg>';

// Get selector function
var get = function(elem) {
    return document.getElementById(elem);
}

// Start websocket and user
var socket = io("ws://coinzap.io");
var username = 'filestore.net';
socket.emit('add user', username);

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
  document.getElementById("walletAddressInput").select();
  document.execCommand("Copy");
  document.getElementById("myTooltip").style.width = "70px";
  document.getElementById("myTooltip").style.marginLeft = "-40px";
  document.getElementById("myTooltip").innerHTML = "Copied!";
}

function outFunc() {
  document.getElementById("myTooltip").style.width = "140px";
  document.getElementById("myTooltip").style.marginLeft = "-75px";
  document.getElementById("myTooltip").innerHTML = "Copy to clipboard";
}

// On click of widget button, display in an overlay
widget.onclick = function() {btcpWidget.showPaymentScreen();}

btcpWidget.returnScreenHeading = function() {
    // Set overlay DOM styles
    var overlay = document.createElement("div");
    overlay.id = "btcpButtonOverlay";
    overlay.style.position = "fixed";
    overlay.style.display = "block";
    overlay.style.width = "100%";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.height = "100%";
    overlay.style.textAlign = "center";
    overlay.style.padding = "0";
    overlay.style.color = "#fff";
    overlay.style.background = "rgba(0,0,0,0.01)";
    overlay.style.fontFamily = "Arial";
    overlay.style.paddingTop = "1500px";
    overlay.style.transition = "all 0.3s ease-in-out";

    var closeLink = document.createElement("div");
    closeLink.style.position = "absolute";
    closeLink.style.display = "inline-block";
    closeLink.style.margin = "-30px auto auto 147px";
    closeLink.style.fontSize = "24px";
    closeLink.style.color = "#555";
    closeLink.style.cursor = "pointer";
    closeLink.onclick = function(){paidEnough ? alert("Payment in progress, please wait") : btcpWidget.doOverlay('hide');};
    closeLink.onmouseover = function(){this.style.color = '#ddd'};
    closeLink.onmouseout = function(){this.style.color = '#555'};
    closeLink.innerHTML = "x";

    var btcpFullLogo = document.createElement("div");
    btcpFullLogo.style.display = "block";
    btcpFullLogo.style.margin = "0 auto 20px auto";
    btcpFullLogo.style.width = "320px";
    btcpFullLogo.style.height = "58px";
    btcpFullLogo.style.background = 'url(\'data:image/svg+xml;charset=UTF-8,'+btcpLogoFull+'\') no-repeat 0 0';
	btcpFullLogo.style.backgroundSize = '320px 58px';
    btcpFullLogo.style.cursor = "pointer";
    btcpFullLogo.onclick = function(){window.open("https://btcprivate.org");};
    btcpFullLogo.oncontextmenu = function(){
        btcpWidget.incrLogoRightClicks(event);
        return false;
    };

    return {'overlay':overlay,'closeLink':closeLink,'btcpFullLogo':btcpFullLogo};
}

btcpWidget.showPaymentScreen = function(anim) {
    // Get heading
    var headingElems = btcpWidget.returnScreenHeading();
    var overlay = headingElems['overlay'];
    var closeLink = headingElems['closeLink'];
    var btcpFullLogo = headingElems['btcpFullLogo'];

    var payAmountText = document.createElement("div");
    payAmountText.id = "payAmountText";
    payAmountText.style.margin = "0 auto";
    payAmountText.innerHTML = 'Please pay <b>'+btcpWidget.data.amount+' BTCP</b> to wallet:';

    var walletAddr = document.createElement("span");
    walletAddr.id = "walletAddress";
    walletAddr.className = "walletAddress";
    walletAddr.style.padding = "10px";
    walletAddr.style.fontSize = "12px";
    walletAddr.style.color = "#fff";
    walletAddr.style.background = "#111";
    walletAddr.innerHTML = btcpWidget.data.wallet;

    var walletAddressInput = document.createElement("input");
    walletAddressInput.id = "walletAddressInput";
    walletAddressInput.type = "text";
    walletAddressInput.value = btcpWidget.data.wallet;
    walletAddressInput.style.position = "absolute";
    walletAddressInput.style.top = "-1000px";

    var clipboardTooltip = document.createElement("div");
    clipboardTooltip.id = "clipboardTooltip";
    clipboardTooltip.className = "tooltip";
    clipboardTooltip.style.margin = "0 auto 24px auto";

    var clipboardLink = document.createElement("a");
    clipboardLink.href = "javascript:copy()";
    clipboardLink.id = "clipboardLink";
    clipboardLink.onmouseout = function() {outFunc()};
    clipboardLink.style.position = "absolute";
    clipboardLink.style.display = "inline-block";
    clipboardLink.style.width = "34px";
    clipboardLink.style.height = "34px";
    clipboardLink.style.top = "3px";
    clipboardLink.style.background = btcpWidgetData[btcpWidgetID]['background'];

    var clipboardTooltipText = document.createElement("span");
    clipboardTooltipText.id = "myTooltip";
    clipboardTooltipText.className = "tooltiptext";
    clipboardTooltipText.innerHTML = "Copy to clipboard";

    var clipboard = document.createElement("div");
    clipboard.style.position = "absolute";
    clipboard.style.display = "inline-block";
    clipboard.style.top = "6px";
    clipboard.style.left = "7px";
    clipboard.style.width = "23px";
    clipboard.style.height = "23px";
    clipboard.style.background = 'url(\'data:image/svg+xml;charset=UTF-8,'+clipboardIcon+'\') no-repeat 0 0';
	clipboard.style.backgroundSize = '20px 20px';
    clipboard.style.cursor = "pointer";

    /* var walletButton = document.createElement("a");
    walletButton.id = "electrumButton";
    walletButton.style.display = "block";
    walletButton.style.width = "176px";
    walletButton.style.margin = "20px auto 5px auto";
    walletButton.style.fontSize = "18px";
    walletButton.style.color = "#fff";
    walletButton.style.background = btcpWidgetData[btcpWidgetID]['background'];
    walletButton.style.borderRadius = btcpWidgetData[btcpWidgetID]['border_radius'];
    walletButton.style.padding = "10px";
    walletButton.style.textDecoration = "none";
    walletButton.innerHTML = "Pay via BTCP wallet";
    walletButton.href = btcpURI; */

    var walletButton = btcpWidget.returnButton();
    walletButton.id = "electrumButton";
    walletButton.style.width = "176px";
    walletButton.innerHTML = "Pay via BTCP wallet";
    walletButton.href = btcpURI;

    var walletWhat = document.createElement("a");
    walletWhat.id = "walletWhat";
    walletWhat.style.fontSize = "10px";
    walletWhat.style.color = "#bbb";
    walletWhat.style.textDecoration = "none";
    walletWhat.innerHTML = "What is this?";
    walletWhat.href = "javascript:alert(\'Expand div to explain what it is, uses etc\')";

    var walletGet = document.createElement("a");
    walletGet.id = "walletGet";
    walletGet.style.fontSize = "10px";
    walletGet.style.color = "#bbb";
    walletGet.style.textDecoration = "none";
    walletGet.style.margin = "0 0 20px 5px";
    walletGet.innerHTML = "Get it!";
    walletGet.href = "javascript:alert(\'Go to link to get it...\')";

    var qrCodeHeading = document.createElement("b");
    qrCodeHeading.id = "qrCodeHeading";
    qrCodeHeading.style.display = "block";
    qrCodeHeading.style.margin = "20px auto 10px auto";
    qrCodeHeading.innerHTML = "or by QR Code:";

    var qrCodeElem = document.createElement("div");
    qrCodeElem.id = "qrCode";
    qrCodeElem.style.display = "inline-block";
    qrCodeElem.style.marginBottom = "20px";
    qrCodeElem.style.padding = "10px";
    qrCodeElem.style.background = "#fff";

    var transactionRef = document.createElement("div");
    transactionRef.id = "transactionRef";
    transactionRef.style.display = "none";
    transactionRef.style.width = "200px";
    transactionRef.style.margin = "5px auto 20px auto";
    transactionRef.innerHTML = "Transaction ref: "+btcpWidget.transactionRef;

    var orderProgressBarContainer = document.createElement("div");
    orderProgressBarContainer.id = "orderProgressBarContainer";
    orderProgressBarContainer.style.display = "none";
    orderProgressBarContainer.style.width = "200px";
    orderProgressBarContainer.style.margin = "5px auto 20px auto";
    orderProgressBarContainer.style.textAlign = "left";
    orderProgressBarContainer.style.background = "#888";
    orderProgressBarContainer.innerHTML = '<div id="orderProgressBar" style="display: inline-block; width: 0; background: #272d63; transition: all 0.5s ease-in-out">&nbsp;</div>';

    var orderProgressInfo = document.createElement("b");
    orderProgressInfo.id = "orderProgressInfo";
    orderProgressInfo.style.display = "block";
    orderProgressInfo.style.marginBottom = "5px";
    orderProgressInfo.innerHTML = "Order completes after:<br>"+(approvalOnRecognition ? "BTCP sent" : approvalConfirmsNeeded+" confirmations");

    var helpLink = document.createElement("a");
    helpLink.style.fontSize = "10px"
    helpLink.style.color = "#bbb";
    helpLink.style.textDecoration = "none";
    helpLink.innerHTML = "Need help?";
    helpLink.href = "https://support.btcprivate.org/";
    helpLink.target = "_blank";

    clipboardLink.appendChild(clipboardTooltipText);
    clipboardLink.appendChild(clipboard);
    clipboardTooltip.appendChild(clipboardLink);

    overlay.appendChild(closeLink);
    overlay.appendChild(btcpFullLogo);
    overlay.appendChild(payAmountText);
    overlay.appendChild(walletAddr);
    overlay.appendChild(walletAddressInput);
    overlay.appendChild(clipboardTooltip);
    overlay.appendChild(walletButton);
    overlay.appendChild(walletWhat);
    overlay.appendChild(walletGet);
    overlay.appendChild(qrCodeHeading);
    overlay.appendChild(qrCodeElem);
    overlay.appendChild(transactionRef);
    overlay.appendChild(orderProgressBarContainer);
    overlay.appendChild(orderProgressInfo);
    overlay.appendChild(helpLink);

    // Add overlay with 4 options to merchants website
    document.body.insertAdjacentElement('afterend',overlay);
    // Do regular 'show' anim unless an anim specified
    btcpWidget.doOverlay(!anim ? 'show' : anim);

    $('#qrCode').qrcode(btcpURI);
}

btcpWidget.showMerchantSupportScreen = function(anim) {
    get('btcpButtonOverlay').parentNode.removeChild(get('btcpButtonOverlay'));
    // Get heading
    var headingElems = btcpWidget.returnScreenHeading();
    var overlay = headingElems['overlay'];
    var closeLink = headingElems['closeLink'];
    var btcpFullLogo = headingElems['btcpFullLogo'];

    var merchantSupportText = document.createElement("div");
    merchantSupportText.style.margin = "0 auto";
    merchantSupportText.innerHTML = 'Merchant Support<br><br>Widget Version v'+btcpWidget.version;

    var displaySetupInfoButton = btcpWidget.returnButton();
    displaySetupInfoButton.style.width = "176px";
    displaySetupInfoButton.style.cursor = "pointer";
    displaySetupInfoButton.innerHTML = "Display Setup Info";
    displaySetupInfoButton.onclick = function() {
        btcpWidget.displayInfo();
    }

    var vendorsSiteButton = btcpWidget.returnButton();
    vendorsSiteButton.style.width = "176px";
    vendorsSiteButton.innerHTML = "vendors.btcprivate.org";
    vendorsSiteButton.href = "https://vendors.btcprivate.org";
    vendorsSiteButton.target = "_blank";

    var supportSiteButton = btcpWidget.returnButton();
    supportSiteButton.style.width = "176px";
    supportSiteButton.innerHTML = "support.btcprivate.org";
    supportSiteButton.href = "https://support.btcprivate.org";
    supportSiteButton.target = "_blank";

    var mainSiteButton = btcpWidget.returnButton();
    mainSiteButton.style.width = "176px";
    mainSiteButton.innerHTML = "btcprivate.org";
    mainSiteButton.href = "https://btcprivate.org";
    mainSiteButton.target = "_blank";

    var backLink = document.createElement("a");
    backLink.style.display = "block"
    backLink.style.fontSize = "10px"
    backLink.style.color = "#bbb";
    backLink.style.textDecoration = "none";
    backLink.style.margin = "20px auto 0 auto";
    backLink.style.cursor = "pointer";
    backLink.innerHTML = "&lt;&lt;&lt; Back";
    backLink.onclick = function() {
        get('btcpButtonOverlay').parentNode.removeChild(get('btcpButtonOverlay'));
        btcpWidget.showPaymentScreen('show-instant');
    };

    overlay.appendChild(closeLink);
    overlay.appendChild(btcpFullLogo);
    overlay.appendChild(merchantSupportText);
    overlay.appendChild(displaySetupInfoButton);
    overlay.appendChild(vendorsSiteButton);
    overlay.appendChild(supportSiteButton);
    overlay.appendChild(mainSiteButton);
    overlay.appendChild(backLink);

    // Add overlay with 4 options to merchants website
    document.body.insertAdjacentElement('afterend',overlay);
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
// Load libs:
var bitcore = require('bitcore-lib-btcp');
var socket = io('http://54.212.206.172:8001');
socket.emit('subscribe', 'bitcoind/hashblock');
socket.emit('subscribe', 'bitcoind/addresstxid', [address]);
socket.emit('subscribe', 'bitcoind/rawtransaction');

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

// On addresstxid subscription response
socket.on('bitcoind/addresstxid', function(data) {
  // Get and confirm address
  var bitcoreAddress = bitcore.Address(data.address);
  if (bitcoreAddress.toString() == address && paidEnough) {
      // Set transaction ID and update progress info
      btcpWidget.txID = data.txid;
      displayProcessingMessage();
   }
});
// May be useful, can decode as JSON using use RPC method 'decodeRawTransaction'
// Info on that function: https://github.com/BTCPrivate/BitcoinPrivate/blob/8a28216fa9796dffb1bdce0103aaa21476fb66c0/src/rpcrawtransaction.cpp#L188
// ch4ot1c note: you can decode it with the decoderawtransaction rpc method (do the decoding on the daemon) with bitcore-lib-btcp / btcprivate-js
socket.on('bitcoind/rawtransaction', function(transactionHex) {
    if ("undefined" == typeof amountToPay) {
        amountToPay = amount;
        console.log("SET amountToPay to "+amountToPay);
    }
    // Get outputs from tx hex
    var o = bitcore.Transaction(transactionHex).outputs;
    // Cycle through and find our address in that tx block
    for (var i=0; i<o.length; i++) {
        if (bitcore.Address.fromScript(bitcore.Script.fromBuffer(o[i]._scriptBuffer)).toString() == address) {
            // Check user has paid correct amount
            // TODO: if not enough paid, display messaging that user needs to pay more
            console.log(address + " FOUND");
            console.log(o);
            console.log(o[i]);
            console.log(o[i].satoshis + " VS " + (amountToPay * 100000000));
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
                btcpURI = 'bitcoin:'+encodeURI(btcpWidget.data.wallet)+
                    '?amount='+amountToPay+
                    '&message='+encodeURI(btcpWidget.data.description)+
                    '&r='+encodeURI(btcpWidget.getLocation(window.location).origin);
                // Apply that to button and QR code
                get('electrumButton').href = btcpURI;
                $('#qrCode')[0].innerHTML = "";
                $('#qrCode').qrcode(btcpURI);
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

// On receiving hashblock info, get the hex for it
socket.on('bitcoind/hashblock', function(blockhashHex) {
    if (paidEnough) {
        // Increase number of confirms
        numConfirms++;
        // Display relevant message
        if (numConfirms === 0) {
            console.log("Transaction created within block");
            get('orderProgressInfo').innerHTML = "BTCP payment progress:<br>Received on block "+explorerLink;
        } else {
            get('orderProgressInfo').innerHTML = "BTCP payment progress:<br>"+numConfirms+" of "+approvalConfirmsNeeded+" confirms "+explorerLink;
            get('orderProgressBar').style.width = (((numConfirms+1)/(approvalConfirmsNeeded+1))*200) + "px";
        }
        // If at or above number of confirms needed for approval
        if (numConfirms >= approvalConfirmsNeeded) {
          processPayment();
        }
        console.log(numConfirms + " :: " + blockhashHex);
    }
});

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

// On document load
window.onload = function() {
    get("wallet").innerHTML = address;
};
