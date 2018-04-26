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

btcpLogoFull = '<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" clip-rule="evenodd" viewBox="0 0 4439 806"><g transform="scale(5.5556)"><clipPath id="a"><path d="M142.12 90.166c-9.61 38.596-48.653 62.082-87.204 52.459C16.38 133.001-7.08 93.911 2.536 55.318 12.141 16.72 51.184-6.77 89.724 2.852c38.549 9.621 62.006 48.718 52.396 87.314z"/></clipPath><g clip-path="url(#a)"><path fill="#2b2f63" fill-rule="nonzero" d="M-4.615-4.304h153.89v154.08H-4.615z"/></g><clipPath id="b"><path d="M98.005 81.934c-2.7.466-4.04.641-6.773.801-1.248.074-2.5.153-3.754.221 3.627 2.487 5.899 5.887 4.722 10.615-2.196 8.827-13.714 7.628-22.231 5.736l-2.865 11.737h.002l-.129.514-3.732 15.279 9.558 2.385 3.985-15.988c16.421 3.111 28.769 1.853 33.965-13.017 3.234-9.243.892-16.364-4.112-20.794-.107.052-.214.1-.317.137-2.325.841-5.596 1.906-8.319 2.374z"/></clipPath><g clip-path="url(#b)"><path fill="#fefefe" fill-rule="nonzero" d="M58.245 74.423h58.995v59.799H58.245z"/></g><clipPath id="c"><path d="M95.178 62.507c-2.716 10.893-19.473 5.358-24.91 4.002l4.794-19.25c5.437 1.356 22.943 3.89 20.116 15.248zm3.664-37.836l-9.629-2.404-3.84 15.421a418.136 418.136 0 0 0-7.717-1.816l3.867-15.524-9.623-2.402-3.946 15.832a319.126 319.126 0 0 1-6.149-1.446l-13.27-3.369-2.563 10.298s7.146 1.638 6.997 1.741c3.898.974 4.604 3.557 4.486 5.605l-2.88 11.567-2.508 10.074-5.417 21.748c-.479 1.188-1.687 2.969-4.414 2.291.096.142-7.001-1.748-7.001-1.748l-4.779 11.034 12.532 3.129c2.331.586 4.614 1.199 6.863 1.776l-3.983 16.019 9.616 2.404 3.948-15.852 3.129-11.599 5.288-21.226c1.112.272 2.225.515 3.49.803 3.885.906 7.962 1.241 11.928 1.538 2.439.182 4.886.304 7.331.274 3.645-.046 7.364-.727 10.809-1.882 2.893-.967 6.335-2.205 8.483-4.487 2.513-2.669 3.776-6.215 4.311-9.79 1.746-11.693-7.145-17.978-19.303-22.17l3.944-15.839z"/></clipPath><g clip-path="url(#c)"><path fill="#fefefe" fill-rule="nonzero" d="M25.456 12.946h93.964v116.96H25.456z"/></g><g transform="translate(0 1)"><clipPath id="d"><path d="M534.79 37.27c8.505 0 14.918 1.606 19.24 4.818s6.484 7.89 6.484 14.035c0 4.748-.897 8.85-2.689 12.306-1.792 3.457-4.34 6.302-7.643 8.537-3.303 2.234-7.274 3.892-11.913 4.975-4.638 1.082-9.804 1.623-15.497 1.623h-7.274l-6.536 27.022h-10.226l17.289-71.64c2.952-.699 6.08-1.152 9.383-1.362 3.303-.209 6.431-.314 9.382-.314zm-1.265 8.588c-4.99 0-8.012.14-9.066.419l-6.958 28.803h6.642c2.952 0 5.974-.262 9.066-.785 3.093-.524 5.869-1.449 8.329-2.776a16.91 16.91 0 0 0 6.061-5.499c1.582-2.339 2.372-5.359 2.372-9.059 0-3.98-1.476-6.826-4.427-8.536-2.952-1.711-6.958-2.567-12.019-2.567zm53.906 9.113c.844 0 1.792.035 2.847.104 1.054.07 2.091.192 3.11.367 1.019.174 1.95.349 2.793.524.844.174 1.476.366 1.898.576l-2.846 8.483c-1.406-.558-3.023-.977-4.85-1.256a34.804 34.804 0 0 0-5.271-.419c-1.476 0-2.934.104-4.375.314-1.441.209-2.688.489-3.742.838l-11.175 46.084h-9.804l12.65-52.369c2.811-.977 5.834-1.763 9.067-2.356a53.548 53.548 0 0 1 9.698-.89zm13.213 55.615h-9.804l13.178-54.463h9.804l-13.178 54.463zm11.386-64.309c-1.617 0-2.97-.488-4.059-1.466-1.089-.977-1.634-2.339-1.634-4.085 0-2.234.703-3.997 2.108-5.289 1.406-1.292 2.987-1.938 4.744-1.938 1.617 0 2.987.507 4.112 1.519 1.124 1.013 1.687 2.427 1.687 4.242 0 2.095-.738 3.788-2.214 5.08s-3.057 1.937-4.744 1.937zm13.002 64.309a227.523 227.523 0 0 1-2.425-11.73 306.078 306.078 0 0 1-2.108-13.354 286.73 286.73 0 0 1-1.582-14.402c-.421-4.957-.702-9.95-.843-14.977h9.91c.07 3.421.228 7.069.474 10.945.246 3.875.545 7.75.896 11.626.352 3.875.773 7.611 1.265 11.207s1.019 6.86 1.582 9.793c2.108-2.654 4.304-5.778 6.589-9.374a174.33 174.33 0 0 0 6.588-11.312c2.109-3.945 4.042-7.908 5.799-11.888s3.162-7.646 4.216-10.997h9.91c-1.546 4.608-3.514 9.391-5.903 14.349-2.39 4.957-4.973 9.828-7.749 14.611s-5.693 9.374-8.75 13.773-6.027 8.309-8.908 11.73h-8.961zm71.511.629a38.738 38.738 0 0 1-1.054-2.566 19.701 19.701 0 0 1-.843-2.985c-1.547 1.396-3.62 2.793-6.22 4.189-2.601 1.397-5.798 2.095-9.594 2.095-3.092 0-5.745-.489-7.959-1.466-2.214-.978-4.024-2.34-5.429-4.085-1.406-1.746-2.443-3.806-3.11-6.18-.668-2.374-1.002-4.992-1.002-7.855 0-4.678.791-9.252 2.372-13.721a35.01 35.01 0 0 1 7.116-11.94c3.163-3.491 7.134-6.319 11.913-8.484 4.779-2.164 10.366-3.246 16.762-3.246 1.898 0 4.112.209 6.642.628s4.709 1.117 6.536 2.095l-8.118 32.887c-.351 1.606-.65 3.143-.896 4.609s-.369 3.002-.369 4.608.141 3.23.422 4.871.773 3.404 1.476 5.289l-8.645 1.257zm-15.708-7.541c2.952 0 5.482-.629 7.591-1.886 2.108-1.257 3.936-2.723 5.482-4.399.07-1.187.193-2.426.369-3.718.175-1.292.404-2.601.685-3.928l6.325-25.974c-.351-.14-.931-.245-1.739-.315a25.718 25.718 0 0 0-2.161-.104c-4.006 0-7.626.768-10.859 2.304s-5.991 3.578-8.275 6.127c-2.285 2.549-4.042 5.516-5.272 8.903-1.23 3.386-1.844 6.93-1.844 10.631 0 1.466.14 2.95.421 4.451s.791 2.828 1.529 3.98 1.722 2.095 2.952 2.828 2.828 1.1 4.796 1.1zm49.9 8.379c-5.271 0-9.136-1.152-11.596-3.457-2.46-2.304-3.69-5.656-3.69-10.055 0-2.862.492-6.528 1.476-10.997l11.28-46.608 10.226-1.676-4.111 16.863h18.659l-2.003 8.169h-18.659l-5.799 24.09c-.843 3.282-1.265 6.145-1.265 8.588 0 2.305.633 3.963 1.898 4.975 1.265 1.013 3.373 1.519 6.325 1.519 2.038 0 4.041-.332 6.009-.995s3.479-1.274 4.533-1.833l.738 8.274c-1.054.629-2.846 1.31-5.376 2.043s-5.412 1.1-8.645 1.1zm30.819-30.06c4.076-.14 7.801-.402 11.174-.786 3.374-.384 6.291-1.047 8.75-1.99 2.46-.942 4.375-2.217 5.746-3.823 1.37-1.606 2.056-3.7 2.056-6.284 0-.628-.123-1.292-.369-1.99s-.668-1.344-1.265-1.937c-.598-.594-1.424-1.083-2.478-1.467s-2.354-.576-3.9-.576c-2.46 0-4.762.524-6.906 1.571a20.938 20.938 0 0 0-5.745 4.137c-1.687 1.711-3.128 3.701-4.322 5.97a32.194 32.194 0 0 0-2.741 7.175zm10.015 29.955c-3.585 0-6.677-.506-9.277-1.519-2.601-1.012-4.78-2.409-6.537-4.189a16.742 16.742 0 0 1-3.9-6.232c-.844-2.374-1.265-4.888-1.265-7.541 0-4.888.738-9.601 2.214-14.14s3.584-8.553 6.325-12.045a30.665 30.665 0 0 1 10.015-8.326c3.936-2.06 8.399-3.09 13.389-3.09 2.881 0 5.359.366 7.432 1.1 2.073.733 3.76 1.728 5.06 2.985a11.968 11.968 0 0 1 2.899 4.346c.633 1.641.949 3.334.949 5.08 0 3.282-.597 6.057-1.792 8.327-1.195 2.269-2.776 4.172-4.744 5.708s-4.27 2.723-6.905 3.561a61.463 61.463 0 0 1-8.223 1.99c-2.847.489-5.728.82-8.645.995s-5.675.332-8.275.471a11.268 11.268 0 0 0-.106 1.362v.838c0 1.606.193 3.124.58 4.556a8.508 8.508 0 0 0 2.161 3.77c1.054 1.083 2.513 1.938 4.375 2.566 1.863.629 4.305.943 7.327.943 1.335 0 2.723-.122 4.164-.366a35.59 35.59 0 0 0 4.112-.943 50.73 50.73 0 0 0 3.479-1.152c1.019-.384 1.739-.751 2.161-1.1l.843 8.274c-1.406.768-3.672 1.589-6.8 2.462-3.127.872-6.799 1.309-11.016 1.309z"/></clipPath><g clip-path="url(#d)"><path fill="#75a0d4" fill-rule="nonzero" d="M493.73 28.499h310.14v88.554H493.73z"/></g></g><clipPath id="e"><path d="M195.97 112.58c-4.216 0-8.539-.175-12.966-.524-4.428-.349-8.434-.908-12.019-1.676l16.868-70.174c4.006-.768 8.205-1.292 12.598-1.571s8.416-.419 12.071-.419c4.217 0 7.854.437 10.911 1.309 3.057.873 5.552 2.043 7.485 3.509s3.373 3.195 4.322 5.185 1.423 4.102 1.423 6.336c0 1.536-.158 3.142-.474 4.818s-.949 3.334-1.898 4.975c-.948 1.641-2.249 3.195-3.9 4.661-1.652 1.466-3.813 2.793-6.484 3.98 3.163 1.396 5.482 3.299 6.958 5.708s2.214 5.08 2.214 8.013c0 3.351-.668 6.581-2.003 9.688s-3.479 5.865-6.431 8.274-6.782 4.329-11.491 5.761c-4.709 1.431-10.436 2.147-17.184 2.147zm-1.475-32.678l-4.534 18.852c1.125.21 2.548.367 4.27.472s3.321.157 4.797.157c2.108 0 4.199-.157 6.272-.471 2.074-.315 3.936-.891 5.588-1.729 1.651-.838 3.004-1.99 4.058-3.456 1.055-1.466 1.582-3.352 1.582-5.656 0-.977-.193-1.955-.58-2.932-.387-.978-1.002-1.851-1.845-2.619s-1.95-1.396-3.321-1.885c-1.37-.489-3.004-.733-4.902-.733h-11.385zm3.057-12.255h10.331c4.217 0 7.362-.907 9.435-2.723 2.074-1.815 3.11-3.98 3.11-6.494 0-1.326-.298-2.461-.896-3.404a6.643 6.643 0 0 0-2.372-2.251c-.984-.559-2.108-.96-3.373-1.205a20.55 20.55 0 0 0-3.901-.366c-1.476 0-3.057.052-4.744.157-1.687.104-2.952.227-3.795.366l-3.795 15.92zm53.484 43.99h-15.602l13.177-55.092h15.708l-13.283 55.092zm7.59-61.795c-2.178 0-4.146-.646-5.903-1.938-1.757-1.291-2.636-3.264-2.636-5.917 0-1.467.299-2.846.896-4.137.598-1.292 1.388-2.409 2.372-3.352s2.126-1.693 3.427-2.252c1.3-.559 2.688-.838 4.164-.838 2.178 0 4.146.646 5.903 1.938s2.636 3.264 2.636 5.917a9.745 9.745 0 0 1-.896 4.138 10.97 10.97 0 0 1-2.372 3.351 11.423 11.423 0 0 1-3.426 2.252 10.436 10.436 0 0 1-4.165.838zm17.325-7.017l16.34-2.514-4.006 16.234h17.5l-3.162 12.778h-17.395l-4.639 19.272c-.421 1.606-.685 3.107-.79 4.504-.106 1.396.07 2.601.527 3.613.457 1.013 1.247 1.798 2.372 2.357 1.124.558 2.67.838 4.638.838 1.687 0 3.321-.158 4.902-.472a36.276 36.276 0 0 0 4.797-1.309l1.16 11.94a56.674 56.674 0 0 1-6.853 1.99c-2.459.559-5.376.838-8.75.838-4.849 0-8.609-.716-11.28-2.147-2.67-1.432-4.568-3.387-5.693-5.865-1.124-2.479-1.616-5.325-1.476-8.537.141-3.211.633-6.598 1.476-10.159l10.332-43.361zm25.969 46.817c0-4.748.773-9.217 2.319-13.406 1.546-4.19 3.76-7.855 6.642-10.998 2.881-3.142 6.378-5.621 10.489-7.436 4.112-1.815 8.697-2.723 13.758-2.723 3.162 0 5.991.297 8.486.89 2.495.594 4.762 1.379 6.8 2.357l-5.377 12.149a53.387 53.387 0 0 0-4.375-1.518c-1.511-.454-3.356-.681-5.534-.681-5.271 0-9.418 1.763-12.44 5.289s-4.533 8.327-4.533 14.401c0 3.562.773 6.442 2.319 8.641 1.546 2.2 4.393 3.3 8.539 3.3 2.038 0 4.006-.21 5.904-.629s3.584-.943 5.06-1.571l1.16 12.464c-1.968.768-4.129 1.449-6.484 2.042-2.354.594-5.218.89-8.592.89-4.357 0-8.047-.628-11.069-1.885s-5.517-2.95-7.485-5.08c-1.968-2.129-3.391-4.625-4.269-7.488-.879-2.863-1.318-5.866-1.318-9.008zm65.502 23.461c-3.725 0-6.958-.558-9.699-1.675-2.741-1.118-5.007-2.689-6.799-4.713-1.793-2.025-3.146-4.417-4.059-7.175-.914-2.758-1.371-5.813-1.371-9.165 0-4.189.686-8.379 2.056-12.568 1.37-4.19 3.391-7.96 6.062-11.312 2.67-3.351 5.939-6.092 9.804-8.222 3.866-2.129 8.293-3.194 13.283-3.194 3.655 0 6.87.558 9.646 1.676 2.776 1.117 5.061 2.688 6.853 4.713s3.145 4.416 4.059 7.174c.913 2.758 1.37 5.813 1.37 9.165 0 4.189-.668 8.379-2.003 12.568-1.335 4.19-3.303 7.96-5.904 11.312-2.6 3.352-5.851 6.092-9.751 8.222-3.901 2.13-8.416 3.194-13.547 3.194zm7.801-44.827c-2.319 0-4.357.663-6.114 1.99-1.757 1.326-3.233 3.002-4.428 5.027s-2.091 4.242-2.688 6.651c-.598 2.409-.896 4.696-.896 6.86 0 3.561.562 6.302 1.687 8.222 1.124 1.92 3.162 2.881 6.114 2.881 2.319 0 4.357-.664 6.114-1.99 1.758-1.327 3.233-3.003 4.428-5.028s2.091-4.242 2.688-6.651c.598-2.409.897-4.695.897-6.86 0-3.561-.563-6.302-1.687-8.222-1.125-1.92-3.163-2.88-6.115-2.88zm38.831 43.361h-15.603l13.178-55.092h15.708l-13.283 55.092zm7.59-61.795c-2.179 0-4.146-.646-5.903-1.938-1.757-1.291-2.636-3.264-2.636-5.917 0-1.467.299-2.846.896-4.137.598-1.292 1.388-2.409 2.372-3.352s2.126-1.693 3.426-2.252a10.435 10.435 0 0 1 4.164-.838c2.179 0 4.147.646 5.904 1.938s2.636 3.264 2.636 5.917a9.745 9.745 0 0 1-.896 4.138 10.97 10.97 0 0 1-2.372 3.351 11.416 11.416 0 0 1-3.427 2.252c-1.3.559-2.688.838-4.164.838zm15.005 9.217a197.81 197.81 0 0 0 3.954-1.205c1.44-.453 3.057-.872 4.849-1.256s3.795-.699 6.009-.943 4.727-.367 7.538-.367c8.293 0 13.986 2.374 17.078 7.122 3.093 4.749 3.62 11.242 1.582 19.482l-7.169 29.745h-15.708l6.958-29.117c.421-1.815.755-3.578 1.001-5.289s.229-3.212-.052-4.504c-.282-1.292-.932-2.339-1.951-3.142s-2.583-1.204-4.691-1.204c-2.038 0-4.111.209-6.22.628l-10.226 42.628h-15.708l12.756-52.578z"/></clipPath><g clip-path="url(#e)"><path fill="#2b2f64" fill-rule="nonzero" d="M165.98 26.405h317.89V118.1H165.98z"/></g></g></svg>';

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
