/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.17-log : Database - shoe
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`shoe` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `shoe`;

/*Table structure for table `cart` */

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `cartid` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `price` int(20) DEFAULT NULL,
  `num` int(20) DEFAULT NULL,
  `img` varchar(20) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  PRIMARY KEY (`cartid`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

/*Data for the table `cart` */

insert  into `cart`(`cartid`,`id`,`uid`,`name`,`price`,`num`,`img`,`state`) values (3,2,5,'火云鞋神',77,6,'5.png',0),(5,4,4,'千里行',60,4,'4.png',0),(6,5,5,'火云鞋神',77,5,'5.png',0),(28,2,8,'adidas Originals Sta',70,1,'8.png',0),(29,3,10,'adidas Ozweego',90,3,'10.png',1),(30,3,8,'adidas Originals Sta',70,1,'8.png',1),(31,3,10,'adidas Ozweego',90,1,'10.png',1);

/*Table structure for table `chat` */

DROP TABLE IF EXISTS `chat`;

CREATE TABLE `chat` (
  `username` varchar(20) DEFAULT NULL,
  `yu` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `chat` */

insert  into `chat`(`username`,`yu`) values ('a','111'),('aa','123');

/*Table structure for table `chat1` */

DROP TABLE IF EXISTS `chat1`;

CREATE TABLE `chat1` (
  `fasong` varchar(20) DEFAULT NULL,
  `jieshou` varchar(20) DEFAULT NULL,
  `yu` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `chat1` */

insert  into `chat1`(`fasong`,`jieshou`,`yu`) values ('aa','0','1234'),('a','0','3456');

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `img` varchar(60) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `sellnum` int(20) DEFAULT NULL,
  `score` int(20) DEFAULT NULL,
  `shuoming` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`uid`,`name`,`price`,`img`,`category`,`sellnum`,`score`,`shuoming`) values (1,'踏遍大江南',100,'1.png','跑步鞋',423,8,'adidas Originals Superstar诞生于1969年，是第一双将全皮面鞋身与橡胶鞋头结合在一起的低帮篮球鞋，Superstar最开始是作为高帮篮球鞋Pro Model的低帮版本而出现的，但因为其独特和醒目的橡胶鞋头造型而让大家熟知，被大家形象地称为\"shelltoe\"贝壳头。在70年代的美国职业篮球场上，接近3/4的NBA球员都将这双Superstar作为首选场上用鞋，80年代之后，经过不断的改良和发展，Superstar逐渐成为横跨时装、音乐、街头文化、休闲和运动等各大领域的时尚潮鞋，将Superstar推至了前所未有的疯狂流行浪潮中。Superstar也成为了永恒的经典。 '),(3,'快步',50,'3.png','跑步鞋',2312,3,'一款篮球休闲鞋，采用了经典的高帮厚底造型，并运用绒面合成皮革打造鞋面，营造出质感十足的复古外观，在鞋领部位加入网眼材质提升脚踝的舒适度，鞋侧加入了经典的缝制三条纹，中底搭载模切EVA鞋垫提供柔和舒适的脚感，以篮球基因演绎出简约的运动休闲风范。'),(4,'千里行',60,'4.png','跑步鞋',576,9,'是Puma推出的一双休闲潮流鞋款，采用经典简约的版型搭配低调的细节设计，低鞋领赋予脚踝良好的活动度，鞋领内侧设有织物衬里，为双脚带来更加舒适包裹，整体造型简约清爽，轻便百搭，十分适合作为日常出街的穿搭之选。 '),(5,'火云鞋神',77,'5.png','跑步鞋',423,3,'采用经典的彪马复古板鞋Puma Suede的外形。在Puma Suede Classic鞋款身上，反绒皮材质是经典的标志，质感出众，外观典雅大方，更加的体现出复古鞋款的韵味来说，其它运动品牌的复古鞋款中都有采用反绒皮这一鞋款面料，制作复古鞋款来更有味，其外观的质感一下就能征服消费者的眼球。而从细节上体现的精致性，极其具有标志性的彪马烫金LOGO标志，辅以PUMA流线型的条纹，质感和潮流特性被完美诠释。 '),(6,'Puma RS-X',80,'6.png','跑步鞋',865,7,'早在上世纪80年代，RS系列便是高水准的运动鞋款。2018年11月，Puma为这一经典注入新鲜活力，推出全新的Puma RS-X Reinvention，令其焕发新生。RS-X Reinvention不仅从过去的潮流中汲取设灵感，更积极探索未来运动时尚的设计方向，进一步扩展了品牌气质的独特理念。秉持着回溯经典的设计理念，RS-X Reinvention以创新的廓形设计极大程度的提升了穿着的贴合度与舒适度；鞋面采用网眼材质和织物材质混搭打造，内部配有模制鞋垫，以实现更好的脚感；典的皮革、麂皮材质的覆层设计与后跟处带有压花设计的织物层相结合，使其的时尚外观、强大的功能性与舒适度结合的恰到好处。RS-X Reinvention的配色设计从Puma众多极具代表性的经典单品中吸收精华，为致力于将重塑精神发挥至极致的全新鞋款再添重彩。'),(7,'Nike Air Flight 89',66,'7.png','跑步鞋',23,5,' 早年间，Nike品牌对于篮球鞋的定位划分只有Force和Flight两种，Flight系列象征球场上的飞行者。1989年，第一款第一款以Flight之名而问世的球鞋问世：Nike Air Flight 89。Air Flight 89的外观与经典的Air Jordan 4颇为相似，采用了相同的外底和中底设计，同样搭载了开窗式的Air Sole气垫，经典的尼龙网格元素和迷你Swoosh等细节更是加分，真皮材质打造的鞋面极具质感，复古气息浓厚。Flight 89曾由青涩的雷吉·米勒代言，由于轻量化的程度有限，脆弱的支撑性也被人诟病，再加上初入联盟的米勒人气平平，Flight 89的市场反响冷淡。随着近年来复古风格的盛行，Flight 89以经典的外观和出众的性价比受到人们的追捧，Nike也多次对其进行复刻，推出了许多漂亮的配色。'),(8,'adidas Originals Stan Smith',70,'8.png','跑步鞋',422,8,' adidas Originals Stan Smith是有史以来第一双签名运动鞋，是adidas专门为美国网球传奇人物Stan Smith(斯坦·史密斯)设计的，并以此命名。Adidas Stan Smith诞生于上世纪60年代，以1963年的Rober Haillet为原型，将经典钻孔三条纹等简约细节原创打造，简约的外观，经典的设计，造就了Sneaker界不可逾越的潮流传奇，至今是adidas单一产品销售量最好的一双鞋，总量已经超过4000万双。如今，这双简约而经典的网球鞋从各大时装周到路上行人的行头，都是随处可见，成为了潮流网站和时尚杂志上的最新宠儿。'),(9,'闪击3',100,'9.png','休闲鞋',4232,3,'于2016年7月上市，是2016-2017赛季CBA联赛指定战靴，鞋面采用精致一体织材质，轻质透气同时具备良好支撑性，鞋面印花设计更具时尚感；中底采用Bounce+科技，营造出色回弹缓震性能；中足碳纤维板提供足弓支撑，带来强大的稳定性与抗扭转性；后足处EVA上包设计，提供稳定支撑与强化保护；大底V字纹理设计提供多向防滑性，前掌圆圈吸盘强化抓地力，后跟处硅胶设计增强缓震，实现更加强劲性能。'),(10,'adidas Ozweego',90,'10.png','休闲鞋',532,5,' adidas Ozweego X-Model Pack以上世纪90年代的经典造型为设计灵感，采用了时下最为流行的老爹鞋风格，用繁复曲折的鞋身线条和混合材质的鞋面向复古主义的经典致敬。adidas Ozweego X-Model Pack采用了宽厚的鞋型设计，鞋面由网眼布面、合成革和绒面革材质混搭而成，经典的三条纹融入两侧，鞋身细节呈现出丰富的层次感。中底造型呈现出独特的管状细节，并具备着前掌Adiprene+和后掌Adiprene的组合配置，提供舒适的穿着体验和脚感。adidas Ozweego X-Model Pack的其中一款彩虹配色十分引人注目，将宽厚的中底打造成了渐变的彩虹色，绚丽夺目的同时更添未来感，旨在向LGBTQ致敬。'),(11,'音速7',67,'11.png','休闲鞋',542,8,'除了在时装周秀场上大放异彩外，李宁旗下签约的开拓者双枪之一CJ 迈克勒姆在2018-2019赛季打出了令人惊艳的高光表现，而其脚下的战靴李宁 音速7也受到了非常高的关注度。李宁于2019年3月正式发售了第七代音速战靴。李宁 音速7继承了音速一脉所特有的轻盈性和包裹性，鞋面采用了轻薄透气的一体织织物工艺，提供透气、舒适、柔和的触感；织物鞋面外覆盖了大面积的穿孔式TPU包裹，搭配鞋带系统带来类似于飞线的紧密设计，为双脚在激烈对抗中提供稳固的支撑和更加结实的包裹；鞋领口位置采用了袜套设计，更加贴合脚踝，后跟处的提手也使得穿脱更加方便。'),(12,'adidas Originals Nizza',78,'12.png','休闲鞋',534,3,'adidas Nizza是adidas以典藏系列为原型，于1975年打造出的鞋款。整款球鞋设计简洁明了，保留了70年代的复古设计，这个系列主要是采用帆布为材料作为鞋面，有着高帮和低帮两种款式，并且有着半橡胶的鞋头和圆润造型，为整双鞋注入了轻松简约的独特气息。鞋后跟没有写adidas而是写着nizza，更符合整款鞋子的独特气质。不管是外形的设计还是材料的使用，都让adidas Nizza充满着复古的气息，简约的设计加上复古的气质，令adidas Nizza既能像经典致敬，又能在日常生活中百搭出场。'),(13,'Timberland',80,'13.png','休闲鞋',87,1,'Nathan Swartz在南波士顿创立Abington鞋业公司，开始了自己的事业。几年后，他的两个儿子Sidney和Herman加入家族企业，并将公司迁至新罕布什尔州的Newmarket。1973年，Sidney推出了一款防水皮靴：这是同类靴子中最早的一款。融合顶级全粒面磨砂皮、橡胶抓地齿厚鞋底，以及无与伦比的工艺，\"黄靴\"一经推出即备受欢迎。Sidney将这款靴子命名为\"Timberland\"。10061作为timberland旗下最知名的一款鞋，融合了卓越的工艺和美国人的创新精神，不仅成为Timberland品牌的基石，更在制鞋行业树立了新的标准。'),(14,'adidas Ultra Boost 19',90,'14.png','休闲鞋',765,6,'Ultra Boost 1.0以独特的Primeknit 编织鞋面，与Boost中底等革命性的技术，强势开启了最强跑鞋之路；Ultra Boost 2.0加入了抓地力十足的马牌大底；Ultra Boost 3.0将鞋面纹路微调成流线设计，鞋面的三线Logo稳定器带有一点透明感；Ultra Boost 4.0则针对Primeknit 做些微变化，让鞋面整体更丰富。'),(15,'adidas Originals Rivalry',60,'15.png','休闲鞋',363,8,'Rivalry最初诞生于上世纪80年代，曾是adidas为NBA球星帕特里克·尤因打造的个人签名鞋款，拥有着当时经典的高帮鞋身外观和厚实的橡胶大底。在近年来复古潮流盛行的流行趋势下，adidas以80年代篮球风格为设计灵感，将复古格调与现代舒适相结合，打造出全新的adidas Originals Rivalry，采用粒面皮革鞋面构筑鞋身，将经典的侧边三条纹元素和adidas Rivalry表示缀入其中，最后以轻量化且脚感舒适的EVA大底收尾，呈现出经典复古造型。adidas Originals在2018年底之时，为Rivalry推出了一款极为惊艳的青花瓷配色，一幅中国古典画作在鞋体上徐徐铺展，通体白底蓝纹的对立将中国风轻松呈现，呼应青花瓷器所特有的窑烧裂纹，为单调的白色增添巧思，将中国古风元素完美的融入到了鞋款之中，使街头风格与中国元素强势混搭，碰撞出独特的潮流态度'),(16,'Converse Pro Leather',70,'16.png','休闲鞋',452,9,'Converse Pro Leather首次诞生于上世纪70年代，由J博士朱丽叶斯•欧文代言，当年发布之后便一举挽回了Converse在篮球鞋市场上的颓势，重新稳固了优势地位，而Pro Leather独特的星箭Logo、优质的皮革面料鞋面与复核材料大底成为了一个时代的经典，也成为了日后众多球鞋的设计原型。'),(17,'adidas VS SET',50,'17.png','球鞋',678,5,'adidas VS SET是adidas推出的一款场下篮球休闲鞋款，于2017年底上市发售。VS SET采用了帆布材质构筑鞋面，造型设计上十分简约，仅在侧面以合成革三条纹作为装饰细节，同时彰显品牌魅力，鞋身内融入织物衬里，带来舒适透气的穿着体验，硫化橡胶大底耐磨防滑，整体风格偏休闲慵懒，适合作为日常休闲的穿搭选择。'),(18,'Puma Smash',80,'18.png','球鞋',23,4,'Puma Smash V2休闲鞋采用经典简约的低帮版型，以皮革、合成革和织物制成鞋面，带来柔软舒适的穿着感受，大底搭载人字形底纹抓地耐穿，鞋身以经典跑道元素和Puma美洲狮品牌Logo装饰细节，彰显潮流质感，外观清爽复古，经典百搭。'),(19,'KT系列',56,'19.png','球鞋',73,3,'在NBA 2018-19赛季开始前，安踏推出由adidas前设计师Rob Fuller设计的全新 KT4 签名战靴。本次KT 4用上了之前在安踏跑鞋上装备的的备受好评的A-FLASHFOAM闪能中底科技。闪能科技缓震落地时会吸收大量冲击，在软弹上有不输给阿迪达斯boost的体验。闪能科技用在kt4上最明显的特征就是鞋内侧的一个个椭圆下陷，只是这种类似虫洞的小孔对密集恐惧症患者不太友好。'),(20,'韦德之道全城7',57,'20.png','球鞋',56,9,'鞋侧中底位置装饰有韦德的专属Logo，同样搭载了横贯鞋面的魔术贴，而全城7在匠心独特的将魔术贴绑带设计融入了\"7\"的概念，用来呼应第七代；整体鞋面采用了拼接设计，分别用到了织物、热熔、塑料还有内侧后跟的皮革材质，鞋带与缠绕的魔术贴组成了整个鞋面的包裹系统，使得包裹感提升到了一个新的层次。'),(21,'Nike Presto React',58,'21.png','球鞋',24,10,'随着Nike React科技凭借出众的舒适度在全球市场风靡热销后，Nike便不断尝试将其融入更多的鞋款之中，为我们带来更多的可能性。于是在2018年底，Nike将React科技与旗下经典的Air Presto跑鞋相结合，打造出了全新的Nike Presto React，并于2019年夏季正式上市发售。Nike Presto React完美继承了Air Presto跑鞋的经典元素，将复古和科技完美融合，采用了流畅自然的低帮鞋身造型设计，中足的笼状结构从解剖学中汲取灵感，鞋跟采用绒面革覆层设计，并搭配有厚实的鞋带。'),(22,'adidas Ultra Boost 4.0',59,'22.png','球鞋',798,3,'adidas Ultra Boost最早推出于2015年，是adidas旗下最强的跑鞋，无论从外形设计还是革命性的鞋底改造，Ultra Boost都重新定义了人们心中原来对于跑鞋的理解。adidas Ultra Boost 4.0在2017年推出，其Primeknit一体化编制鞋身被赋予了崭新的立体纹路细节，更具袜套感。而有别于3.0版本，两侧半透明Cage也重新回归纯色设计，部分鞋款还以类似于弹道尼龙的材质取代原本的TPU设定，还加入磨砂质感的后跟支架作呼应。同时鞋面还增加了镂空透气孔，令穿着更为舒适。进入第四代，adidas Ultra Boost依然具备着极高的性能和潮流的造型，受到·很多鞋迷的喜爱。'),(23,'adidas Marquee Boost',60,'23.png','球鞋',34,2,'在2018年底为推出了一款由签约球星约翰·沃尔代言的团队球鞋--adidas Marquee Boost，其拥有着不逊色球星签名鞋的实战性能表现，最大的亮点在于略显复古的外观设计，这也十分贴合时下最流行的时尚潮流。Marquee Boost的鞋面主体由Primeknit织物打造，以皮革材质补强，有效的兼顾了透气性和包裹性，复合材料的应用也进一步增加了球鞋的整体质感。'),(24,'adidas Yung-96',50,'24.png','球鞋',78,7,'adidas Originals凭借发布的Yung-1与Falcon在老爹鞋市场赢得了不少人气，2018年8月又为我们带来了全新的老爹鞋款--adidas Yung-96，以纯正90年代街头气质，将复古与现代完美结合。adidas Yung-96的鞋面搭载了网面、麂皮、皮革等多种材质组合，采用了分层式设计，繁复的厚重感与加宽的鞋楦，展现了90年代的流行风格；经典的Torsion Bar悬挂技术和复古大底，为双脚提供舒适的穿着脚感；鞋舌与鞋跟嵌有深色的三叶草Logo，不同材质的撞色设计呈现出明显的层次感，既有复古老爹鞋的风格，同时也带有强烈街头属性。'),(25,'Presto React',30,'25.png','球鞋',442,5,'React科技凭借出众的舒适度在全球市场风靡热销后，Nike便不断尝试将其融入更多的鞋款之中，为我们带来更多的可能性。于是在2018年底，Nike将React科技与旗下经典的Air Presto跑鞋相结合，打造出了全新的Nike Presto React，并于2019年夏季正式上市发售。Nike Presto React完美继承了Air Presto跑鞋的经典元素，将复古和科技完美融合，采用了流畅自然的低帮鞋身造型设计，中足的笼状结构从解剖学中汲取灵感，鞋跟采用绒面革覆层设计，并搭配有厚实的鞋带。中底采用了流畅自然的中底几何结构，并搭载了React泡棉，带来舒适的脚感和独特的视觉效果。');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `userpwd` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `authority` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`userpwd`,`email`,`authority`) values (1,'admin','123','123@qq.com',1),(3,'aa','123','12345@qq.com',0),(16,'test','12345','abc@qq.com',0),(21,'a','123','1237@qq.com',0);

/*Table structure for table `user1` */

DROP TABLE IF EXISTS `user1`;

CREATE TABLE `user1` (
  `username` varchar(20) DEFAULT NULL,
  `au` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user1` */

insert  into `user1`(`username`,`au`) values ('a',0),('aa',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
