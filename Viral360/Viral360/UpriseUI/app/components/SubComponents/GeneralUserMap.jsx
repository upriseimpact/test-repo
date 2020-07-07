import React, { PureComponent } from 'react';
import Card from './Card.jsx';
import './GeneralUserMap.scss';

export default class GeneralUserMap extends PureComponent {
    render() {
        return (
            <Card f1>
                <div className="general-user-map-container">
                    <div className="title">Users from <span className="country">United States</span></div>
                    <div className="map">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="150 0 600 600" width="400" height="200">
                            {/* <defs id="defs60"/> */}
                            <path style={{ fill: '#d3d3d3' }} d="M 805.21607,266.06202 L 805.41802,265.40356 L 809.72912,265.34184 L 812.80066,266.31181 L 814.90225,266.63513 L 815.87221,264.53354 L 814.41727,262.43196 L 814.41727,260.65369 L 811.99236,258.5521 L 809.89078,253.05565 L 811.18406,247.72085 L 811.0224,245.61927 L 809.72912,244.32598 C 809.72912,244.32598 811.18406,242.70938 811.18406,242.06274 C 811.18406,241.41609 811.66904,239.96115 811.66904,239.96115 L 813.60897,238.66787 L 815.54889,237.05126 L 816.03387,238.02123 L 814.57893,239.63783 L 813.28565,243.35602 L 813.60897,244.48764 L 815.38723,244.81096 L 815.87221,250.30742 L 813.77063,251.27738 L 814.09395,254.83391 L 814.57893,254.67225 L 815.71055,252.73233 L 817.32716,254.51059 L 815.71055,255.80388 L 815.38723,259.19875 L 817.9738,262.59362 L 821.85365,263.0786 L 823.47026,262.2703 L 826.70681,266.45323 L 828.06516,266.98953 L 828.76271,267.29867 L 828.90662,269.2457 L 828.13975,272.34331 L 826.55275,276.52638 L 826.10686,281.97549 L 827.5772,286.6163 L 829.74147,284.70016 L 831.56944,279.722 L 831.10769,276.33156 L 831.52578,271.74574 L 834.44573,267.96663 L 835.21614,264.74879 L 834.71883,264.19258 L 836.72641,260.16871 L 836.95336,255.30492 L 836.7274,254.59089 L 834.46317,247.23587 L 833.4932,247.72085 L 829.93667,245.29595 L 828.15841,240.60779 L 826.21848,237.05126 L 823.95524,236.0813 L 821.85365,232.52477 L 822.35259,230.42318 L 822.86297,230.92722 L 823.95524,233.17141 L 827.18845,236.0813 L 832.03826,238.34455 L 836.07977,238.99119 L 836.24143,240.44613 L 835.43313,241.41609 L 835.75645,244.16432 L 836.56475,244.16432 L 838.66634,241.73942 L 839.47464,236.8896 L 842.22287,232.84809 L 845.29442,226.38167 L 846.42604,220.88522 L 845.7794,219.75359 L 845.61774,210.37728 L 844.00113,206.98242 L 842.86951,207.79072 L 840.12128,208.11404 L 839.6363,207.62906 L 840.76793,206.65909 L 842.86951,204.71917 L 842.93257,203.62534 L 843.47304,203.5396 L 844.64778,204.07253 L 848.68929,202.9409 L 854.50907,201.00098 L 857.09563,200.03101 L 864.20869,194.69622 L 868.08854,191.78633 L 871.48341,188.2298 L 867.28024,186.6132 L 865.98696,188.06814 L 863.07707,190.81637 L 855.15571,194.69622 L 852.89246,194.53456 L 851.27586,193.88792 L 850.14423,194.53456 L 847.88099,197.12113 L 846.42604,198.41441 L 845.13276,198.73773 L 844.80944,197.44445 L 846.74936,195.66618 L 845.95281,193.98776 L 846.96715,194.21757 L 851.9225,190.81637 L 855.47903,187.58316 L 857.41895,185.48157 L 858.22726,186.12821 L 860.97548,184.67327 L 866.14862,183.54165 L 873.19331,180.05038 L 874.07001,179.82344 L 876.97987,178.85349 L 879.40478,176.91357 L 880.5364,175.1353 L 881.82968,175.29696 L 884.74063,173.76056 L 885.25981,173.3875 L 887.32614,172.38707 L 886.84116,170.12383 L 887.64946,168.66888 L 890.55935,167.21394 L 891.36765,170.28549 L 890.88267,172.06375 L 888.45776,173.5187 L 888.45776,174.48866 L 890.39769,173.03372 L 894.27754,168.50722 L 898.15739,166.5673 L 902.36056,165.11235 L 902.03724,162.68745 L 901.06728,159.77756 L 899.12735,157.35265 L 897.34909,156.54435 L 895.2475,156.70601 L 894.76252,157.19099 L 895.73248,158.48427 L 897.18743,157.67597 L 899.28901,159.29258 L 900.09732,162.0408 L 898.31905,163.81907 L 896.05581,164.78903 L 892.49928,164.30405 L 888.61942,158.32261 L 886.35618,155.73605 L 884.57791,155.73605 L 883.44629,156.54435 L 881.50636,153.95778 L 881.82968,152.50284 L 884.25459,147.3297 L 881.36535,142.91686 L 880.79902,142.42476 L 881.66802,141.34826 L 882.75824,138.05724 L 883.13131,136.93803 L 884.25459,130.67867 L 884.41625,126.31384 L 885.8712,125.02056 L 884.90123,121.78735 L 887.97278,118.23082 L 889.58939,119.68576 L 890.88267,119.20078 L 896.21747,116.12923 L 896.54079,113.21934 L 899.45068,112.73436 L 901.06728,110.14779 L 900.90562,108.53119 L 900.5823,105.45964 L 901.3906,104.16636 L 901.06728,103.03473 L 899.774,101.57979 L 901.87558,100.28651 L 903.65385,103.51972 L 905.10879,103.19639 L 905.43211,104.48968 L 905.43211,106.10628 L 907.37204,106.26794 L 907.85702,103.51972 L 908.342,102.87307 L 906.7254,101.41813 L 907.69536,99.963185 L 910.12027,98.508241 L 911.09023,97.053296 L 912.86849,96.891636 C 912.86849,96.891636 913.19182,98.993222 913.83846,98.993222 C 914.4851,98.993222 915.13174,98.993222 915.13174,98.993222 L 919.98155,93.496766 L 923.37642,90.425217 L 925.31635,89.778575 L 927.41794,85.090422 L 927.41794,83.150496 L 925.15469,79.432305 L 923.21476,77.330719 L 920.46654,77.49238 L 920.95152,78.624003 L 920.78986,79.108984 L 919.98155,79.108984 L 917.07167,76.845738 L 916.91001,71.995924 L 916.1017,70.055998 L 910.12027,70.055998 L 901.06728,40.148811 L 899.12735,39.178849 L 893.14592,36.753942 L 891.69097,36.592281 L 889.91271,38.370546 L 885.8712,41.280435 L 885.8712,42.250397 L 885.06289,43.0587 L 882.31467,42.412058 L 881.02138,40.148811 L 881.02138,39.017188 L 879.7281,38.855528 L 878.43481,38.855528 L 876.33323,43.0587 L 873.42334,51.950026 L 871.64507,56.79984 L 871.80674,61.649654 L 871.9684,63.104598 L 871.16009,65.852826 L 870.35179,66.822789 L 870.35179,72.804226 L 872.29172,75.229133 L 870.83677,79.270645 L 868.2502,83.958798 L 867.4419,89.455254 L 867.4419,92.041822 L 865.92811,91.631923 L 864.50757,91.750088 L 863.65083,92.208542 L 862.75375,92.203482 L 862.10711,93.820087 L 861.46047,93.335106 L 860.4905,92.365143 L 859.03556,94.305068 L 858.98709,99.337122 L 858.06661,99.63916 L 831.81913,106.3866 L 831.19711,106.78334 L 823.63192,108.85451 L 819.10542,110.30945 L 815.87221,110.14779 L 810.37576,111.44108 L 807.2944,112.68702 L 804.8793,114.51263 L 802.77772,116.93753 L 800.02949,120.65572 L 797.1196,125.18222 L 795.66465,128.09211 L 795.01801,128.90041 L 789.19824,134.39686 L 789.3599,136.98343 L 790.1682,138.11506 L 791.94646,138.92336 L 793.72473,138.92336 L 793.72473,140.3783 L 792.59311,142.47989 L 792.91643,143.93483 L 794.37137,146.03642 L 794.20971,148.29966 L 792.26978,149.43129 L 790.1682,149.43129 L 788.55159,151.37121 L 786.77333,154.60442 L 784.67174,156.38269 L 779.49861,156.86767 L 776.91204,157.99929 L 774.81045,159.29258 L 773.19385,159.13092 L 771.25392,157.83763 L 764.94917,157.99929 L 761.71596,158.48427 L 757.67444,159.77756 L 753.30961,161.2325 L 750.39972,163.01077 L 752.33965,169.15387 L 754.11791,169.31553 L 755.4112,172.38707 L 755.57286,173.35704 L 754.44123,174.327 L 752.33965,177.07523 L 751.85467,178.69183 L 749.91474,180.4701 L 748.13648,181.60172 L 747.16651,183.21833 L 745.87323,184.34995 L 744.44513,185.47533 L 743.4394,185.99452 L 737.95187,191.62467 L 736.65858,192.10965 L 732.45629,195.11854 L 731.43589,195.0077 L 725.34235,199.06105 L 721.4625,201.3243 L 718.06763,205.04249 L 714.02612,208.92234 L 710.79291,209.73064 L 707.88302,210.21562 L 702.38656,212.80219 L 700.28498,212.96385 L 696.89011,209.8923 L 691.71697,210.53895 L 689.13041,209.084 L 686.74934,207.73317 L 685.59749,207.4083 L 685.73554,206.82075 L 685.8972,205.36581 L 687.99878,201.64762 L 689.99934,199.90977 L 689.77705,194.85788 L 691.37404,193.26089 L 692.46466,192.91795 L 692.68694,189.36142 L 694.22271,186.3303 L 695.2735,186.93652 L 695.43516,187.58316 L 696.24347,187.74482 L 698.18339,186.77486 L 697.86007,177.23689 L 694.62686,168.9922 L 692.36361,159.93922 L 689.93871,156.70601 L 687.35214,154.92774 L 685.73554,156.05937 L 681.85568,157.83763 L 679.91576,162.84911 L 677.16753,166.5673 L 676.03591,167.21394 L 674.58096,166.5673 C 674.58096,166.5673 671.9944,165.11235 672.15606,164.46571 C 672.31772,163.81907 672.64104,159.45424 672.64104,159.45424 L 676.03591,158.16095 L 676.84421,154.76608 L 677.49085,152.17952 L 679.91576,150.56291 L 679.59244,140.53996 L 677.97583,138.27672 L 676.68255,137.46841 L 675.87425,135.36683 L 676.68255,134.55853 L 678.29915,134.88185 L 678.46081,133.26524 L 676.03591,131.00199 L 674.74262,128.41543 L 672.15606,128.41543 L 667.62956,126.96048 L 662.13311,123.56561 L 659.38488,123.56561 L 658.73824,124.21226 L 657.76827,123.72727 L 654.69673,121.46403 L 651.78684,123.24229 L 648.87695,125.50554 L 649.20027,129.06207 L 650.17023,129.38539 L 652.27182,129.87037 L 652.7568,130.67867 L 650.17023,131.48698 L 647.58367,131.8103 L 646.12872,133.58856 L 645.8054,135.69015 L 646.12872,137.30675 L 646.45204,142.80321 L 642.89551,144.9048 L 642.24887,144.74313 L 642.24887,140.53996 L 643.54215,138.11506 L 644.1888,135.69015 L 643.38049,134.88185 L 641.44057,135.69015 L 640.4706,139.89332 L 637.72238,141.02494 L 635.94411,142.96487 L 635.78245,143.93483 L 636.42909,144.74313 L 635.78245,147.3297 L 633.5192,147.81468 L 633.5192,148.94631 L 634.32751,151.37121 L 633.19588,157.51431 L 631.57928,161.55582 L 632.22592,166.24398 L 632.7109,167.3756 L 631.9026,169.80051 L 631.57928,170.60881 L 631.25596,173.35704 L 634.81249,179.33847 L 637.72238,185.80489 L 639.17732,190.65471 L 638.36902,195.34286 L 637.39906,201.3243 L 634.97415,206.49743 L 634.65083,209.24566 L 631.39196,212.33081 L 630.36734,213.12513 L 627.53777,214.74212 L 625.43618,216.68204 L 624.30456,217.00536 L 622.84961,216.0354 L 619.77855,215.14589 L 618.91895,215.34019 L 618.64644,214.4188 L 617.83814,211.83223 L 616.54486,208.11404 L 614.92825,206.33577 L 613.47331,203.74921 L 613.23974,198.26025 L 612.94089,197.18116 L 613.31165,194.21124 L 611.69504,189.68474 L 611.0484,183.54165 L 609.91678,181.11674 L 610.88674,178.04519 L 611.69504,175.1353 L 613.14999,172.54874 L 612.50334,169.15387 L 611.8567,165.59734 L 612.34168,163.81907 L 614.28161,161.39416 L 614.44327,158.64593 L 613.63497,157.35265 L 614.28161,154.76608 L 614.76659,151.53287 L 617.51482,145.87476 L 620.42471,139.08502 L 620.58637,136.82177 L 620.26305,135.85181 L 619.45474,136.33679 L 615.25157,142.64155 L 612.50334,146.68306 L 610.56342,148.46133 L 609.75512,150.72457 L 608.30017,151.53287 L 607.16855,153.4728 L 605.7136,153.14948 L 605.55194,151.37121 L 606.84523,148.94631 L 608.94681,144.25815 L 610.72508,142.64155 L 611.8264,140.34999 L 612.39377,139.45774 L 615.57489,132.45694 L 616.54486,128.41543 L 618.48478,124.05059 L 619.29308,123.88893 L 620.42471,125.50554 L 621.07135,125.50554 L 625.59784,123.08063 L 627.05279,124.69724 L 627.53777,124.8589 L 628.83105,123.72727 L 629.96267,120.65572 L 632.38758,119.84742 L 639.33898,119.20078 L 641.27891,116.61421 L 646.45204,116.45255 L 652.27182,117.74584 L 654.05008,117.74584 L 657.28329,116.29089 L 659.54654,116.45255 L 661.64813,115.80591 L 665.36632,116.29089 L 666.17462,116.61421 L 667.4679,116.29089 L 666.17462,115.32093 L 664.88134,114.67429 L 661.64813,111.60274 L 661.64813,104.65134 L 660.19318,104.16636 L 659.06156,105.29798 L 652.91846,106.91458 L 650.97853,107.39957 L 648.06865,106.59126 L 647.58367,106.26794 L 647.58367,100.60983 L 646.12872,100.44817 L 643.54215,101.74145 L 639.01566,103.68138 L 632.38758,104.0047 L 628.99271,105.13632 L 624.9512,108.69285 L 623.33459,109.66281 L 622.20297,109.66281 L 620.90969,110.47112 L 619.29308,109.98613 L 617.67648,108.69285 L 616.22153,109.66281 L 612.34168,109.82447 L 609.59345,107.07625 L 608.13851,104.0047 L 606.68357,102.87307 L 603.45036,101.90311 L 601.18711,101.90311 L 599.89383,100.60983 L 596.3373,103.51972 L 595.36733,104.65134 L 594.55903,104.16636 L 594.88235,101.57979 L 597.30726,98.34658 L 597.79224,95.921673 L 600.05549,95.113371 L 601.51043,92.041822 L 605.22862,91.071859 L 605.55194,90.101896 L 604.42032,88.970273 L 599.73217,89.455254 L 595.36733,91.880161 L 593.10409,94.143408 L 591.8108,95.921673 L 590.03254,96.729975 L 588.09261,99.639864 L 587.93095,100.93315 L 583.56612,103.03473 L 581.14121,104.97466 L 575.15978,105.94462 L 574.51313,106.59126 L 574.51313,107.56123 L 570.9566,109.82447 L 568.20837,110.63278 L 567.49209,111.21318 L 566.47456,111.63491 L 565.94513,112.89602 L 564.81351,112.73436 L 564.16686,111.60274 L 561.41864,110.79444 L 560.28701,110.9561 L 558.50875,111.92606 L 557.53878,111.27942 L 558.18543,109.33949 L 560.12535,106.26794 L 561.25697,105.13632 L 559.31705,103.68138 L 557.21546,104.48968 L 554.30557,106.4296 L 546.86919,109.66281 L 543.9593,110.30945 L 541.04942,109.82447 L 540.06769,108.94622 L 539.63268,108.39354 L 543.47432,105.45964 L 544.76761,105.29798 L 549.2941,100.28651 L 551.07237,99.478203 L 553.33561,95.598352 L 555.76052,92.041822 L 558.83207,89.455254 L 563.60681,87.448357 L 572.85259,83.387229 L 576.79131,81.550104 L 577.40341,79.270645 L 572.9635,79.64131 L 572.24989,80.725589 L 571.60324,80.725589 L 569.82498,77.65404 L 560.93365,77.977361 L 559.96369,78.785663 L 558.99373,78.785663 L 558.50875,77.49238 L 557.70044,75.714115 L 555.11388,76.199096 L 551.88067,79.432305 L 550.26406,80.240608 L 547.19251,80.240608 L 544.60595,79.270645 L 544.60595,77.169059 L 543.31266,77.007398 L 542.82768,77.49238 L 540.24111,76.199096 L 539.75613,73.289207 L 538.30119,73.774189 L 537.81621,74.744152 L 535.3913,74.25917 L 530.0565,71.834263 L 526.17665,69.247696 L 523.26676,69.247696 L 521.97348,68.277733 L 519.71023,68.924375 L 518.57861,70.055998 L 518.25529,71.349282 L 513.40548,71.349282 L 513.40548,69.247696 L 507.10072,68.924375 L 506.7774,67.469431 L 501.92758,67.469431 L 500.31098,65.852826 L 498.85603,59.709728 L 498.04773,54.213272 L 496.10781,53.40497 L 493.84456,52.919988 L 493.19792,53.081649 L 492.8746,61.326333 L 462.74218,61.291062 L 461.64538,61.243718 L 433.22188,60.679691 L 414.63093,60.033049 L 388.11861,58.739765 L 363.17227,56.855896 L 361.88845,56.374463 L 331.21413,53.56663 L 301.95358,50.0101 L 272.69304,45.968588 L 240.36094,40.633793 L 221.93165,37.238923 L 189.208,30.306187 L 188.08467,30.145706 L 175.08853,27.617595 L 174.36801,27.215777 L 159.20739,23.821104 L 136.2516,18.162988 L 116.2057,12.504871 L 107.6377,10.564946 L 97.938071,7.8167177 L 93.573239,6.3617734 L 92.441615,7.1700758 L 92.118294,7.9783781 L 94.543201,12.828192 L 95.674825,15.41476 L 93.89656,18.97129 L 93.89656,21.234537 L 94.543201,22.689481 L 93.734899,24.467746 L 94.219881,27.700955 L 95.189843,28.994239 L 95.028183,30.287523 L 93.573239,30.449183 L 92.926597,28.509258 L 91.794974,26.084351 L 90.016708,24.629406 L 90.340029,22.52782 L 92.603276,22.042839 L 92.279955,20.264574 L 91.956634,19.13295 L 89.855048,20.426234 L 88.561764,21.557857 L 88.561764,23.982765 L 86.298518,24.144425 L 82.903645,23.174462 L 79.993756,21.719518 L 76.922205,21.072876 L 72.395712,18.97129 L 69.162503,17.031364 L 66.414275,14.444797 L 63.989368,11.534908 L 61.887782,11.049927 L 59.624535,20.426234 L 61.4028,23.659444 L 61.4028,31.580807 L 60.756158,34.490695 L 62.211103,41.603756 L 64.959331,44.351984 L 60.594498,44.998625 L 60.432837,48.716816 L 63.019405,49.84844 L 61.4028,53.889951 L 58.654572,54.213272 L 58.331251,57.123161 L 60.594498,60.033049 L 58.492912,62.619617 L 56.229665,69.086035 L 52.996456,79.108984 L 49.763246,85.575403 L 44.751772,99.639864 L 38.285353,113.21934 L 30.20233,125.82886 L 28.262404,128.73875 L 27.454102,137.30675 L 26.160818,143.28819 L 28.86901,146.81562 L 28.387579,147.77848 L 26.80746,152.50284 L 26.645799,159.93922 L 21.472664,171.74043 L 18.401116,174.327 L 18.077795,175.45862 L 16.299529,176.26693 L 14.844585,180.4701 L 14.036283,183.70331 L 16.784511,187.90648 L 18.401116,192.10965 L 19.532739,195.66618 L 19.209418,202.1326 L 17.431153,205.20415 L 16.784511,211.02393 L 15.814548,214.74212 L 17.592813,218.62197 L 20.341041,223.14846 L 22.604288,227.99828 L 23.897571,232.03979 L 23.574251,235.273 L 23.25093,235.75798 L 23.25093,237.85956 L 28.909046,244.16432 L 28.424065,246.58923 L 27.777423,248.85248 L 27.130781,250.7924 L 27.292441,259.03709 L 29.394027,262.75528 L 31.333953,265.34184 L 34.082181,265.82683 L 35.052144,268.57505 L 33.920521,272.13158 L 31.818934,273.74819 L 30.687311,273.74819 L 29.879009,277.62804 L 30.36399,280.53793 L 33.5972,284.90276 L 35.213804,290.23756 L 36.668748,294.92571 L 37.962032,297.99726 L 41.356902,303.81704 L 42.811846,306.4036 L 43.296828,309.31349 L 44.913432,310.28345 L 44.913432,312.70836 L 44.10513,314.64829 L 42.326865,321.76135 L 41.841883,323.70127 L 44.266791,326.4495 L 48.469963,326.93448 L 52.996456,328.71275 L 56.876307,330.81433 L 59.786196,330.81433 L 62.696084,333.88588 L 65.282651,338.7357 L 66.414275,340.99894 L 70.294126,343.10053 L 75.14394,343.90883 L 76.598884,346.01042 L 77.245526,349.24363 L 75.790582,349.89027 L 76.113903,350.86023 L 79.347114,351.66853 L 82.095342,351.8302 L 85.005231,356.51835 L 88.885085,360.72152 L 89.693387,362.98477 L 92.279955,367.18794 L 92.603276,370.42115 L 92.603276,379.79746 L 93.088257,381.57572 L 103.11121,383.03067 L 122.83378,385.77889 L 136.74132,386.75359 L 137.74699,387.50041 L 135.11998,389.65874 L 134.79666,391.11369 L 135.28164,392.08365 L 154.19591,402.75324 L 166.32045,410.35128 L 181.03155,418.91929 L 197.84424,428.94224 L 210.13044,431.36715 L 235.25838,434.07206 L 236.86315,434.87445 L 252.32382,436.8636 L 253.6171,426.84065 L 270.26813,429.42722 L 282.72425,431.045 L 283.68593,431.04382 L 285.62584,431.52878 L 288.21243,434.43865 L 289.66738,438.80352 L 294.35554,441.06677 L 295.64882,444.29998 L 302.76189,452.22135 L 304.05517,453.83795 L 309.06664,455.93954 L 310.19827,458.04112 L 311.81487,459.01109 L 312.29985,461.75931 L 315.53306,468.22573 L 315.53306,476.30876 L 317.79631,480.99691 L 325.23269,488.75661 L 330.40583,490.8582 L 332.18409,492.79812 L 332.18409,493.44477 L 336.06394,495.70801 L 338.00387,496.35465 L 339.78213,497.48628 L 342.3687,498.45624 L 344.79361,496.03133 L 349.15844,489.88824 L 350.1284,486.17004 L 352.39165,482.93684 L 355.94818,481.48189 L 360.47467,479.70363 L 363.54622,481.96687 L 370.9826,482.61351 L 377.77234,483.74514 L 380.35891,485.84672 L 380.35891,486.97835 L 382.94548,490.0499 L 388.92692,495.38469 L 389.08858,496.83964 L 390.86684,498.77956 L 391.67514,502.98273 L 397.00994,515.26893 L 396.84828,517.20885 L 401.05145,519.79542 L 404.60798,526.4235 L 408.00285,530.78833 L 411.23606,532.08162 L 412.85266,534.34486 L 411.55938,538.7097 L 412.20602,539.67966 L 413.49931,540.3263 L 413.17599,543.72117 L 412.52934,544.36781 L 413.17599,546.63106 L 416.40919,548.57099 L 417.70248,555.0374 L 419.80406,558.91726 L 427.40211,562.31213 L 432.57524,563.44375 L 436.77841,566.5153 L 440.01162,567.16194 L 441.30491,566.67696 L 446.80136,567.80858 L 452.45948,571.68843 L 455.53103,569.74851 L 456.50099,568.29356 L 454.72273,565.54533 L 453.75276,559.40224 L 451.9745,552.45084 L 451.1662,550.02593 L 451.9745,545.49944 L 453.10612,541.61959 L 454.3994,537.09309 L 455.85435,531.59664 L 453.5911,529.65671 L 454.56107,527.71679 L 458.60258,527.39346 L 462.48243,521.89701 L 465.8773,521.25037 L 471.69708,517.69384 L 473.47534,516.23889 L 479.7801,512.84402 L 485.43821,510.41911 L 490.77301,507.18591 L 493.52124,505.08432 L 499.17935,499.74952 L 500.47264,498.94122 L 502.57422,497.48628 L 505.16079,495.54635 L 506.13075,493.60643 L 515.99204,489.07993 L 521.65692,487.49475 L 522.29848,487.36687 L 526.98496,485.84672 L 535.06798,485.5234 L 545.41425,489.07993 L 551.88067,490.21156 L 555.59886,488.75661 L 558.83207,489.88824 L 562.06528,490.8582 L 562.87358,488.75661 L 559.64037,487.62499 L 557.0538,488.10997 L 554.30557,486.49337 C 554.30557,486.49337 554.46724,485.20008 555.11388,485.03842 C 555.76052,484.87676 558.18543,484.06846 558.18543,484.06846 L 559.96369,485.5234 L 561.74196,484.55344 L 564.97517,485.20008 L 566.43011,487.62499 L 566.75343,489.88824 L 571.27992,490.21156 L 573.05819,491.98982 L 572.24989,493.60643 L 570.9566,494.41473 L 572.57321,496.03133 L 580.97955,499.58786 L 584.53608,498.29458 L 585.50605,495.86967 L 588.09261,495.22303 L 589.87088,493.76809 L 591.16416,494.73805 L 591.97246,497.64794 L 589.70922,498.45624 L 590.35586,499.10288 L 593.75073,497.8096 L 596.01398,494.41473 L 596.82228,493.92975 L 594.72069,493.60643 L 595.52899,491.98982 L 595.36733,490.53488 L 597.46892,490.0499 L 598.60054,488.75661 L 599.24718,489.56491 C 599.24718,489.56491 599.08552,492.63646 599.89383,492.63646 C 600.70213,492.63646 604.097,493.28311 604.097,493.28311 L 608.13851,495.22303 L 609.10847,496.67798 L 612.01836,496.67798 L 613.14999,497.64794 L 615.41323,494.57639 L 615.41323,493.12144 L 614.11995,493.12144 L 610.72508,490.37322 L 604.9053,489.56491 L 601.67209,487.30167 L 602.80372,484.55344 L 605.06696,484.87676 L 605.22862,484.23012 L 603.45036,483.26016 L 603.45036,482.77517 L 606.68357,482.77517 L 608.46183,479.70363 L 607.16855,477.7637 L 606.84523,475.01547 L 605.39028,475.17713 L 603.45036,477.27872 L 602.80372,479.86529 L 599.73217,479.21864 L 598.7622,477.44038 L 600.54047,475.50045 L 602.56122,473.7222 L 603.31778,473.20692 L 604.42032,472.4289 L 607.00689,468.22573 L 608.78515,469.03403 L 615.57489,467.09411 L 617.67648,467.41743 L 619.13142,468.22573 L 624.30456,468.22573 L 624.55882,466.96958 L 625.59784,466.77079 L 628.34607,466.77079 L 628.99271,466.93245 L 630.28599,464.18422 L 631.74094,459.81939 L 634.00419,460.46603 L 637.07573,466.44747 L 637.07573,467.41743 L 634.32751,469.35736 L 637.07573,469.68068 L 642.61779,467.10778 L 643.29612,467.22209 L 646.77536,466.60913 L 652.7568,464.50754 L 658.73824,464.02256 L 663.10307,463.37592 L 670.70111,465.15418 L 678.78414,469.03403 L 680.40074,470.48898 L 683.31063,471.6206 L 684.92723,473.56053 L 685.25055,476.30876 L 688.48376,475.01547 L 692.36361,475.01547 L 695.92015,473.07555 L 699.63834,469.51902 L 702.70988,469.68068 L 703.19487,468.54905 L 702.38656,467.57909 L 702.54822,465.63917 L 706.58974,464.83086 L 709.1763,464.83086 L 712.08619,466.28581 L 716.28936,467.74075 L 718.71427,471.45894 L 721.4625,472.4289 L 722.59412,475.82377 L 725.98899,477.44038 L 727.6056,480.02695 L 729.54552,480.67359 L 734.71866,481.96687 L 736.01194,485.03842 L 739.08349,488.75661 L 739.08349,498.29458 L 737.62855,502.98273 L 737.95187,505.73096 L 739.24515,510.58078 L 741.02342,514.62229 L 741.83172,514.13731 L 743.28666,509.61081 L 740.7001,508.64085 L 740.37677,507.99421 L 741.99338,507.34757 L 746.51987,508.31753 L 746.68153,509.93413 L 743.44832,515.43059 L 741.34674,517.8555 L 744.90327,521.57369 L 747.48983,524.64524 L 750.39972,529.98003 L 753.30961,533.85988 L 755.4112,538.87136 L 757.18946,539.19468 L 758.80607,537.09309 L 760.58433,538.22472 L 763.1709,542.26623 L 763.81754,545.82276 L 766.88909,550.18759 L 767.69739,548.89431 L 771.57724,549.21763 L 775.13377,551.48087 L 778.52864,556.65401 L 779.33695,560.04888 L 779.66027,562.95877 L 780.79189,563.92873 L 782.08518,564.41371 L 784.51008,563.44375 L 785.96503,561.82714 L 789.84488,561.66548 L 792.91643,560.21054 L 795.66465,556.97733 L 795.17967,555.0374 L 794.85635,552.6125 L 795.50299,550.67257 L 795.17967,548.73265 L 797.60458,547.43936 L 797.9279,544.04449 L 797.28126,542.26623 L 796.79628,530.30335 L 795.50299,522.70531 L 790.9765,514.46063 L 787.41997,508.64085 L 784.8334,503.30605 L 781.92351,500.39617 L 779.01363,492.95978 L 779.82193,491.6665 L 780.95355,490.37322 L 779.33695,487.46333 L 775.29544,483.74514 L 770.44562,478.24868 L 766.72743,471.94392 L 761.39264,462.56762 L 757.66294,452.82536 L 755.39728,445.50676 L 755.37832,444.61734 L 754.6029,438.31855 L 756.86614,428.2956 L 758.32109,424.09242 L 757.8361,421.50586 L 761.17051,415.26156 L 760.66021,413.90988 L 761.23097,412.93785 L 763.33256,411.64457 L 768.34404,406.14811 L 767.37407,402.9149 L 770.28396,402.75324 L 773.84049,399.35837 L 775.4571,398.55007 L 777.72034,395.1552 L 780.46857,392.40697 L 782.57016,388.85044 L 784.99506,388.2038 L 786.12669,385.45557 L 787.74329,384.64727 L 788.22827,378.34251 L 790.81484,372.19941 L 796.23601,366.74107 L 796.51628,365.93803 L 801.96941,364.60137 L 806.65757,364.11639 L 807.14255,361.69148 L 809.08247,355.22506 L 812.47734,350.53691 L 818.94376,345.20212 L 824.1169,342.77721 L 826.86512,342.13057 L 827.99675,342.61555 L 829.29003,342.61555 L 832.36158,337.76573 L 834.30151,334.2092 L 833.00822,334.69419 L 830.74498,336.95743 L 830.09833,335.34083 L 825.89516,335.34083 L 827.83509,329.03607 L 827.02679,327.74279 L 825.08686,327.74279 L 825.08686,326.77282 L 824.76354,325.47954 L 826.38014,326.77282 L 827.83509,326.93448 L 830.25999,327.2578 L 833.97819,325.6412 L 835.27147,322.73131 L 835.91811,320.62972 L 838.50468,319.33644 L 838.828,315.13327 L 838.0197,314.48663 L 840.4446,314.32497 L 839.79796,312.06172 L 837.37306,309.63681 L 833.81653,303.17039 L 832.10653,298.47179 L 831.18615,297.54706 L 827.57853,291.53513 L 821.77751,293.22096 L 820.20529,291.72666 L 822.75833,290.34535 L 822.26654,287.82122 L 820.49343,286.03584 L 820.37189,284.62394 L 818.0909,283.08107 L 818.00194,281.46555 L 820.69593,281.56049 L 820.91773,280.17589 L 819.68832,279.38612 L 820.16727,277.45573 L 818.79254,276.35318 L 819.23203,271.6631 L 818.36396,270.46308 L 815.17352,270.06055 L 813.02121,267.97209 L 808.16474,267.02998 L 805.21607,266.06202 z M 767.94269,577.91184 L 770.36761,577.2652 L 771.66089,577.02271 L 773.11585,574.67862 L 775.45993,573.06201 L 776.75322,573.547 L 778.45066,573.87032 L 778.85481,574.92111 L 775.37911,576.13357 L 771.17591,577.58852 L 768.83183,578.80098 L 767.94269,577.91184 z M 781.44139,572.90035 L 782.65385,573.95115 L 785.40209,571.84956 L 790.7369,567.64637 L 794.4551,563.7665 L 796.96085,557.1384 L 797.93082,555.44096 L 798.09248,552.04608 L 797.365,552.53106 L 796.39504,555.36013 L 794.94008,559.96746 L 791.70686,565.22146 L 787.34202,569.42464 L 783.94714,571.36457 L 781.44139,572.90035 z M 836.00199,331.45961 L 838.58857,328.95386 L 841.74095,326.36728 L 843.27673,325.72064 L 843.43839,323.69988 L 842.79175,317.55676 L 841.3368,315.21268 L 840.69015,313.35358 L 841.41763,313.11108 L 844.16587,318.60756 L 844.57002,323.05323 L 844.40836,326.44812 L 841.01348,327.98389 L 838.18441,330.40881 L 837.05279,331.62127 L 836.00199,331.45961 z M 899.97704,173.85121 L 902.14896,173.16533 L 902.60622,171.45066 L 903.63502,171.56497 L 904.66382,173.85121 L 903.4064,174.30845 L 899.5198,174.42277 L 899.97704,173.85121 z M 890.6035,174.65139 L 892.88972,172.02222 L 894.49009,172.02222 L 896.31908,173.50827 L 893.91854,174.53707 L 891.74662,175.56587 L 890.6035,174.65139 z M 902.28301,107.47825 L 903.81879,105.94247 L 905.19291,106.99327 L 905.75872,109.41819 L 904.06128,110.30732 L 902.28301,107.47825 z M 908.99194,101.57763 L 910.77021,103.43673 C 910.77021,103.43673 912.0635,103.51755 912.0635,103.19423 C 912.0635,102.87091 912.30599,101.17347 912.30599,101.17347 L 913.19513,100.36517 L 912.38682,98.586893 L 910.36606,99.31437 L 908.99194,101.57763 z M 820.32087,264.28945 L 821.45249,266.7952 L 821.61415,268.57347 L 822.74578,270.43257 C 822.74578,270.43257 823.63492,269.54343 823.63492,269.22011 C 823.63492,268.89679 822.90745,266.14855 822.90745,266.14855 L 822.17997,263.80446 L 820.32087,264.28945 z M 581.61931,82.059006 L 583.4483,80.001402 L 585.62022,79.201221 L 590.99286,75.314624 L 593.27908,74.743065 L 593.73634,75.200319 L 588.59232,80.344339 L 585.27728,82.287628 L 583.21967,83.202124 L 581.61931,82.059006 z M 667.79369,114.18719 L 668.44033,116.69293 L 671.67355,116.85459 L 672.96684,115.64213 C 672.96684,115.64213 672.88601,114.18719 672.56269,114.02552 C 672.23936,113.86386 670.94608,112.16642 670.94608,112.16642 L 668.76366,112.40891 L 667.14704,112.57057 L 666.82372,113.7022 L 667.79369,114.18719 z M 84.116548,12.340738 L 86.137312,12.179078 L 86.622294,13.553197 L 88.158073,11.936582 L 90.502155,11.936582 L 91.310458,13.472361 L 89.774678,15.169801 L 90.42133,15.978114 L 89.693853,17.998875 L 88.319734,18.403021 C 88.319734,18.403021 87.430596,18.483857 87.430596,18.160536 C 87.430596,17.837215 88.885551,15.573958 88.885551,15.573958 L 87.188111,15.008141 L 86.86479,16.463095 L 86.137312,17.109737 L 84.60153,14.84648 L 84.116548,12.340738 z M 457.2302,567.32304 L 456.66439,560.20996 L 453.91615,553.01604 L 453.35033,545.98379 L 454.88611,537.73908 L 458.20017,530.86849 L 461.67587,525.45284 L 464.82827,521.89629 L 465.47491,522.13879 L 460.70591,528.76689 L 456.34107,535.31417 L 454.3203,541.94226 L 453.99698,547.11542 L 454.88611,553.25854 L 457.47269,560.45246 L 457.95767,565.6256 L 458.11933,567.08056 L 457.2302,567.32304 z M 48.793607,337.03691 L 50.086895,338.57269 L 49.925235,339.86598 L 46.692014,339.78515 L 46.1262,338.57269 L 45.479556,337.11774 L 48.793607,337.03691 z M 50.733539,337.03691 L 51.945997,336.39027 L 55.50254,338.49186 L 58.5741,339.70431 L 57.684964,340.35097 L 53.158455,340.10847 L 51.541845,338.49186 L 50.733539,337.03691 z M 71.426153,356.84039 L 73.204418,359.18447 L 74.012731,360.15444 L 75.54851,360.72025 L 76.114317,359.2653 L 75.144354,357.48703 L 72.476951,355.46627 L 71.426153,355.62793 L 71.426153,356.84039 z M 69.971198,365.48925 L 71.749474,368.64164 L 72.961932,370.58158 L 71.506978,370.82406 L 70.213694,369.61161 C 70.213694,369.61161 69.486217,368.15666 69.486217,367.7525 C 69.486217,367.34836 69.486217,365.57008 69.486217,365.57008 L 69.971198,365.48925 z "/>
                            <circle cx="843" cy="168" r="20" fill="#6580ff"/>
                            <circle cx="324" cy="156" r="20" fill="#6580ff"/>
                            <circle cx="495" cy="330" r="20" fill="#6580ff"/>
                            <circle cx="486" cy="456" r="20" fill="#6580ff"/>
                            <circle cx="231" cy="402" r="20" fill="#6580ff"/>
                            <circle cx="105" cy="258" r="20" fill="#6580ff"/>
                            <circle cx="30" cy="180" r="20" fill="#6580ff"/>
                        </svg>
                    </div>
                </div>
            </Card>
        );
    }
}
