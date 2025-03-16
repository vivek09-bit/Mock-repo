
base_url = {"https://www.indiabix.com/aptitude/problems-on-trains/0":[38002,38008],
    'https://www.indiabix.com/aptitude/time-and-distance/0':[36002,36004],
    # 'https://www.indiabix.com/aptitude/height-and-distance/':[037002],
    'https://www.indiabix.com/aptitude/time-and-work/0':[29002,29007],
    'https://www.indiabix.com/aptitude/simple-interest/0':[46002,46004],
    'https://www.indiabix.com/aptitude/compound-interest/0':[49002,49004],
    'https://www.indiabix.com/aptitude/profit-and-loss/0':[18002,18004],
    'https://www.indiabix.com/aptitude/partnership/0':[24002,24004],
    'https://www.indiabix.com/aptitude/percentage/0':[17002,17004],
    'https://www.indiabix.com/aptitude/problems-on-ages/0':[120002,120004] ,
    'https://www.indiabix.com/aptitude/calendar/0':[62002,62004],
    'https://www.indiabix.com/aptitude/clock/0':[63002,63005],
    'https://www.indiabix.com/aptitude/average/00':[6002,6004],
    'https://www.indiabix.com/aptitude/area/0':[54002,54004],
    'https://www.indiabix.com/aptitude/volume-and-surface-area/0':[58002,58004],
    'https://www.indiabix.com/aptitude/permutation-and-combination/0':[65002,65004],
    'https://www.indiabix.com/aptitude/numbers/00':[1002,1028],
    'https://www.indiabix.com/aptitude/problems-on-numbers/00':[9002,9004],
    'https://www.indiabix.com/aptitude/problems-on-hcf-and-lcm/00':[2002,2007],
    'https://www.indiabix.com/aptitude/decimal-fraction/00':[3002,3007],
    'https://www.indiabix.com/aptitude/simplification/00':[4002,4004],
    'https://www.indiabix.com/aptitude/square-root-and-cube-root/00':[5002,5004]  ,   
    'https://www.indiabix.com/aptitude/surds-and-indices/0':[16002,16004],
    'https://www.indiabix.com/aptitude/ratio-and-proportion/0':[23002,23004],
    'https://www.indiabix.com/aptitude/chain-rule/0':[28002,28004],
    'https://www.indiabix.com/aptitude/pipes-and-cistern/0':[33002,33004],
    'https://www.indiabix.com/aptitude/boats-and-streams/0':[42002,42004],
    'https://www.indiabix.com/aptitude/alligation-or-mixture/0':[45002,45004],
    'https://www.indiabix.com/aptitude/logarithm/0':[53002,53004],
    'https://www.indiabix.com/aptitude/races-and-games/0':[61002,61004],
    'https://www.indiabix.com/aptitude/stocks-and-shares/0':[64002,64004],
    'https://www.indiabix.com/aptitude/probability/0':[66002,66004],
    'https://www.indiabix.com/aptitude/true-discount/0':[67002,67004],
    'https://www.indiabix.com/aptitude/bankers-discount/0':[68002,68004],
    'https://www.indiabix.com/aptitude/odd-man-out-and-series/0':[70002,70004]
    }

base_urls = [] 
for key, value in base_url.items():
    start, end = value
    for num in range(start, end):
        print(f"{key}{num}")
        # base_urls.append(f"{key}{num}")