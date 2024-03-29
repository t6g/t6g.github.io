jQuery(document).ready(function(){
    const projs = [
         {"Planning": "",         "EE": "2005229", "Utilities": "05-0257", "Status": "approve", "LDP": "301013", "Title": "Rivers Trace H"},
         {"Planning": ""        , "EE":	"2005233", "Utilities": "05-0260", "Status": "approve", "LDP": "300993", "Title": "Rivers Trace K"},
         {"Planning": "15CP0045", "EE": "2008215", "Utilities": "06-0387", "Status": "approve", "LDP": "202938", "Title": "Meadowville Landing Section 2 at Rivers Bend"},
         {"Planning": "15CP0062", "EE": "2015068", "Utilities": "15-0029", "Status": "approve", "LDP": "300716", "Title": "Hallsley Section 19"},
         {"Planning": "15CP0091", "EE": "2020132", "Utilities": "20-0114", "Status": "approve", "LDP": "LDP21-118", "Title": "Davis Pond"},
         {"Planning": "15CP0113", "EE": "2015143", "Utilities": "15-0191", "Status": "approve", "LDP": "300902", "Title": "WesterLeigh Section 11"},
         {"Planning": "16CP0021", "EE": "2016041", "Utilities": "15-0268", "Status": "approve", "LDP": "301168", "Title": "Sundial Farms Section 5 at the Highlands"},
         {"Planning": "16CP0023", "EE": "2016044", "Utilities": "15-0277", "Status": "approve", "LDP": "300908", "Title": "Harper's Mill Southeastern Section 1"},
         {"Planning": "16CP0025", "EE": "2016046", "Utilities": "15-0278", "Status": "approve", "LDP": "300971", "Title": "Old Gun Trace"},
         {"Planning": "16CP0061", "EE": "2017051", "Utilities": "16-0297", "Status": "approve", "LDP": "301121", "Title": "Harper's Mill South Section 3"},
         {"Planning": "16CP0079", "EE": "2008145", "Utilities": "05-0015", "Status": "approve", "LDP": "202899", "Title": "Dogwood Villas Section B"},
         {"Planning": "16CP0111", "EE": "2016156", "Utilities": "16-0148", "Status": "approve", "LDP": "301258", "Title": "Watermark Townhomes Section 3"},
         {"Planning": "16CP0118", "EE": "2016157", "Utilities": "16-0155", "Status": "approve", "LDP": "301141", "Title": "Newmarket Section 4"},
         {"Planning": "16CP0122", "EE": "2016159", "Utilities": "16-0159", "Status": "approve", "LDP": "301033", "Title": "Glen Kilchurn Section 2"},
         {"Planning": "16CP0124", "EE": "2016163", "Utilities": "16-0170", "Status": "approve", "LDP": "301243", "Title": "Watermark Townhomes Section 4"},
         {"Planning": "17CP0006", "EE": "2017003", "Utilities": "16-0191", "Status": "approve", "LDP": "301113", "Title": "Watermark Section H"},
         {"Planning": "17CP0009", "EE": "2017010", "Utilities": "07-0286", "Status": "approve", "LDP": "300928", "Title": "Jessup Meadows Section E"},
         {"Planning": "17CP0017", "EE": "2008234", "Utilities": "08-0124", "Status": "approve", "LDP": "301192", "Title": "Wellspring Section 2"},
         {"Planning": "17CP0031", "EE": "2017031", "Utilities": "16-0238", "Status": "approve", "LDP": "",       "Title": "Hallsley Section 22"},
         {"Planning": "17CP0035", "EE": "2008276", "Utilities": "08-0182", "Status": "approve", "LDP": "300673", "Title": "Wellington Farm Section G"},
         {"Planning": "17CP0043", "EE": "2017038", "Utilities": "16-0269", "Status": "approve", "LDP": "301411", "Title": "Lake Margaret Section 2"},
         {"Planning": "17CP0059", "EE": "2017047", "Utilities": "16-0298", "Status": "approve", "LDP": "301063", "Title": "Lake Margaret Section 4"},
         {"Planning": "17CP0061", "EE": "2017061", "Utilities": "16-0321", "Status": "approve", "LDP": "300990", "Title": "Pine Valley Section 2"},
         {"Planning": "17CP0062", "EE": "2017060", "Utilities": "16-0311", "Status": "approve", "LDP": "301019", "Title": "Hallsley Section 25"},
         {"Planning": "17CP0079", "EE": "2007275", "Utilities": "07-0260", "Status": "approve", "LDP": "301094", "Title": "Watermark Section D"},
         {"Planning": "17CP0083", "EE": "2007266", "Utilities": "07-0245", "Status": "approve", "LDP": "301108", "Title": "Watermark Section C"},
         {"Planning": "17CP0087", "EE": "2017094", "Utilities": "17-0025", "Status": "approve", "LDP": "301012", "Title": "Aston Oaks Section 1"},
         {"Planning": "17CP0094", "EE": "2017103", "Utilities": "04-0138", "Status": "approve", "LDP": "301001", "Title": "Notting Place Townhomes Section 1"},
         {"Planning": "17CP0105", "EE": "2017118", "Utilities": "17-0087", "Status": "approve", "LDP": "301048", "Title": "Willow Creek Section 5"},
         {"Planning": "17CP0110", "EE": "2017125", "Utilities": "17-0081", "Status": "approve", "LDP": "301041", "Title": "Collington Section 18"},
         {"Planning": "17CP0112", "EE": "2017126", "Utilities": "17-0082", "Status": "approve", "LDP": "301153", "Title": "Aston Oaks Section 2"},
         {"Planning": "17CP0129", "EE": "2017143", "Utilities": "17-0124", "Status": "approve", "LDP": "301109", "Title": "Rountrey Section 7"},
         {"Planning": "18CP0002", "EE": "2018001", "Utilities": "17-0143", "Status": "approve", "LDP": "301224", "Title": "Valhalla Section 1"},
         {"Planning": "18CP0009", "EE": "2007203", "Utilities": "05-0123", "Status": "approve", "LDP": "300980", "Title": "Cobblestone Creek"},
         {"Planning": "18CP0014", "EE": "2018024", "Utilities": "17-0177", "Status": "approve", "LDP": "301070", "Title": "Valhalla Section 2"},
         {"Planning": "18CP0015", "EE": "2018026", "Utilities": "17-0179", "Status": "approve", "LDP": "301062", "Title": "Roxshire Section 17"},
         {"Planning": "18CP0025", "EE": "2018033", "Utilities": "17-0211", "Status": "approve", "LDP": "301370", "Title": "Landings at Meadowville Section 2"},
         {"Planning": "18CP0043", "EE": "2008097", "Utilities": "06-0290", "Status": "approve", "LDP": "300997", "Title": "Whittington Forest"},
         {"Planning": "18CP0048", "EE": "2018059", "Utilities": "17-0245", "Status": "approve", "LDP": "301115", "Title": "Hampton Pointe Section 1"},
         {"Planning": "18CP0049", "EE": "2018062", "Utilities": "17-0265", "Status": "approve", "LDP": "301073", "Title": "Cottage at Bon Air Section 2"},
         {"Planning": "18CP0056", "EE": "2018067", "Utilities": "17-0271", "Status": "approve", "LDP": "301190", "Title": "Tarrington 20"},
         {"Planning": "18CP0058", "EE": "2018074", "Utilities": "17-0053", "Status": "approve", "LDP": "301195", "Title": "The Village Town Homes"},
         {"Planning": "18CP0063", "EE": "2018077", "Utilities": "18-0014", "Status": "approve", "LDP": "301204", "Title": "Centerpointe Townes Section 1"},
         {"Planning": "18CP0057", "EE": "2018080", "Utilities": "18-0023", "Status": "approve", "LDP": "301314", "Title": "Harper's Mill South Phase Section 5"},
         {"Planning": "18CP0069", "EE": "2018083", "Utilities": "17-0090", "Status": "approve", "LDP": "301154", "Title": "Mason Orchard"},
         {"Planning": "18CP0070", "EE": "2018084", "Utilities": "18-0024", "Status": "approve", "LDP": "301247", "Title": "Winston Park"},
         {"Planning": "18CP0076", "EE": "2018090", "Utilities": "18-0042", "Status": "approve", "LDP": "301228", "Title": "Rivers Trace Section M"},
         {"Planning": "18CP0083", "EE": "2018102", "Utilities": "17-0192", "Status": "approve", "LDP": "301208", "Title": "Hopkins Forest"},
         {"Planning": "18CP0089", "EE": "2018114", "Utilities": "17-0217", "Status": "approve", "LDP": "301198", "Title": "Legacy Park"},
         {"Planning": "18CP0096", "EE": "2018126", "Utilities": "17-0133", "Status": "approve", "LDP": "301151", "Title": "Ramblewood Estates"},
         {"Planning": "18CP0104", "EE": "2018129", "Utilities": "18-0091", "Status": "approve", "LDP": "",		 "Title": "Copper Grove Section 1"},
         {"Planning": "18CP0116", "EE": "2018146", "Utilities": "18-0133", "Status": "approve", "LDP": "301210", "Title": "Bexley Meadows"},
         {"Planning": "19CP0006", "EE": "2019006", "Utilities": "18-0141", "Status": "approve", "LDP": "301433", "Title": "Harper's Mill South Section 7"},
         {"Planning": "19CP0007", "EE": "2019015", "Utilities": "18-0168", "Status": "approve", "LDP": "301303", "Title": "The Towns at Swift Creek"},
         {"Planning": "19CP0026", "EE": "2019026", "Utilities": "17-0150", "Status": "approve", "LDP": "301315", "Title": "Cosby Estates"},
         {"Planning": "19CP0047", "EE": "2019049", "Utilities": "18-0239", "Status": "approve", "LDP": "LDP21-0025", "Title": "Harper's Mill Northwest Section 6"},
         {"Planning": "19CP0048", "EE": "2019071", "Utilities": "",        "Status": "approve",	"LDP": "",        "Title": "Whittington Forest Section 2"},
         {"Planning": "19CP0052", "EE": ""       , "Utilities": "",        "Status": "approve", "LDP": "", "Title": "Stone Wall Trace"},
         {"Planning": "19CP0054", "EE": "2019067", "Utilities":	"18-0255", "Status": "approve", "LDP": "301323", "Title": "Hampton Pointe Section 2"},
         {"Planning": "19CP0057", "EE": "2019075", "Utilities": "18-0254", "Status": "approve",	"LDP": "301246", "Title": "Wescott Section 1"},  
         {"Planning": "19CP0059", "EE": "2019073", "Utilities": "18-0252", "Status": "approve",	"LDP": "301424", "Title": "Jessup Meadows Section G"},
         {"Planning": "19CP0074", "EE": "",        "Utilities": "       ", "Status": "",        "LDP": "      ", "Title": "Broadmoor North 2"},
         {"Planning": "19CP0079", "EE": "2019094", "Utilities": "19-0025", "Status": "approve",	"LDP": "301360", "Title": "Cosby Village Townhomes 1"},
         {"Planning": "19CP0095", "EE": "2019119", "Utilities": "17-0171", "Status": "approve",	"LDP": "301337", "Title": "Pennwood Estates"},
         {"Planning": "19CP0100", "EE": "2019127", "Utilities": "19-0062", "Status": "approve",	"LDP": "301469", "Title": "Rivers Trace Section L"},
         {"Planning": "19CP0110", "EE": "2019133", "Utilities": "19-0072", "Status": "approve",	"LDP": "301261", "Title": "Whittington Forest 3"},
         {"Planning": "19CP0120", "EE": "2019143", "Utilities": "19-0078", "Status": "approve",	"LDP": "301423", "Title": "Kingsland Park 1"},
         {"Planning": "19CP0133", "EE": "2019150", "Utilities": "19-0110", "Status": "approve",	"LDP": "301356", "Title": "The Townes at Notting Place 3"},
         {"Planning": "19CP0134", "EE": "2019155", "Utilities": "05-0393", "Status": "approve",	"LDP": "301367", "Title": "Chesdin Landing 11"},
         {"Planning": "19CP0151", "EE": "2008003", "Utilities": "04-0475", "Status": "Approve",	"LDP": "301279", "Title": "Little Creek"},
         {"Planning": "20CP0025", "EE": "2020017", "Utilities": "19-0181", "Status": "approve",	"LDP": "LDP21-0027", "Title": "Harper's Mill Southwest 6"},
         {"Planning": "20CP0026", "EE": "2020015", "Utilities": "19-0192", "Status": "approve",	"LDP": "LDP21-0024", "Title": "Harper's Mill Southeast 6"},
         {"Planning": "20CP0027", "EE": "2020019", "Utilities": "19-0183", "Status": "approve",	"LDP": "301437", "Title": "Rountrey Section 8"},
         {"Planning": "20CP0060", "EE": "2020056", "Utilities": "20-0001", "Status": "approve",	"LDP": "LDP21-0110", "Title": "Traditions at American Section 1"},
         {"Planning": "20CP0061", "EE": "2020067", "Utilities": "20-0027", "Status": "approve",	"LDP": "LDP21-0028", "Title": "Harper's Mill Northeast Section 10"},
         {"Planning": "20CP0068", "EE": "2020079", "Utilities": "19-0124", "Status": "Approve",	"LDP": "301425", "Title": "Glen Abbey at Magnolia Green Section 1"},
         {"Planning": "20CP0070", "EE": "2020086", "Utilities": "20-0042", "Status": "approve",	"LDP": "", "Title": "Copper Grove Section 2"},
         {"Planning": "20CP0075", "EE": "2020097", "Utilities": "20-0074", "Status": "Approve",	"LDP": "", "Title": "Watermark Section G"},
         {"Planning": "20CP0081", "EE": "2020101", "Utilities": "20-0085", "Status": "",        "LDP": "LDP21-0171", "Title": "Woolridge Landing Section 1"},
         {"Planning": "20CP0090", "EE": "2020108", "Utilities": "",        "Status": "",        "LDP": "", "Title": "Beaverwood"},
         {"Planning": "20CP0091", "EE": "2020109", "Utilities": "20-0100", "Status": "Approve",	"LDP": "301417", "Title": "Austin Woods Section 1"},
         {"Planning": "21CP0008", "EE": "2021014", "Utilities": "20-0167", "Status": "Approve",	"LDP": "", "Title": "Lake Margaret Section 5"},
         {"Planning": "21CP0012", "EE": "2005227", "Utilities": "04-0053", "Status": "Approve",	"LDP": "301401", "Title": "The Townes at Ironbridge Section 1 amended"},
         {"Planning": "21CP0017", "EE": "2021037", "Utilities": "20-0199", "Status": "",        "LDP": "", "Title": "Rountrey Section 9"},
         {"Planning": "21CP0018", "EE": "2021039", "Utilities": "20-0200", "Status": "",        "LDP": "", "Title": "Jessup Meadows Section I"},
         {"Planning": "21CP0019", "EE": "2021052", "Utilities": "20-0206", "Status": "Approve",	"LDP": "", "Title": "Austin Woods Section 2"},
         {"Planning": "21CP0025", "EE": "2021056", "Utilities": "20-0209", "Status": "Approve",	"LDP": "", "Title": "Millpointe Townhomes Section 1&2"},
         {"Planning": "21CP0030", "EE": "2021065", "Utilities": "20-0229", "Status": "",        "LDP": "LDP21-0172", "Title": "Woolridge Landing Section 2"},
         {"Planning": "21CP0032", "EE": "2021067", "Utilities": "20-0224", "Status": "", "LDP": "LDP21-0157", "Title": "Traditions at American Section 2"},
         {"Planning": "21CP0036", "EE": "",	       "Utilities": "20-0232", "Status": "", "LDP": "", "Title": "River Ridge Section F"}, 							
         {"Planning": "21CP0038", "EE": "",	       "Utilities": "21-0011", "Status": "", "LDP": "LDP21-0174", "Title": "Twin Rivers Section 2"},
         {"Planning": "21CP0043", "EE": "",	       "Utilities": "21-0021", "Status": "", "LDP": "", "Title": "Wescott Section 3"},
         {"Planning": "21CP0048", "EE": "2021094", "Utilities": "21-0031", "Status": "approve", "LDP": "LDP21-0109", "Title": "Lake Margaret Section 6"},
         {"Planning": "21CP0049", "EE": "",		   "Utilities": "",        "Status": "approve", "LDP": "LDP21-0098", "Title": "Summer Lake Section 11"},
         {"Planning": "21CP0060", "EE": "",	       "Utilities": "20-0115", "Status": "", "LDP":"", "Title": "Meridian at Magnolia Green Section 1"},
         {"Planning": "21CP0068", "EE": "",	       "Utilities": "21-0086", "Status": "", "LDP":"", "Title": "Kingsland Park Section 2"},
         {"Planning": "21CP0069", "EE": "",        "Utilities": "",        "Status": "", "LDP":"", "Title": "Watermark J"},
         {"Planning": "21CP0070", "EE": "",        "Utilities": "",        "Status": "", "LDP":"", "Title": "Randolph pond"},
         {"Planning": "21CP0071", "EE": "",        "Utilities": "",        "Status": "", "LDP":"", "Title": "Cosby Village Townhomes 2"},
         {"Planning": "21CP0073", "EE": "",        "Utilities": "",        "Status": "", "LDP":"", "Title": "Legacy Park section 2"},
         {"Planning": "21CP0074", "EE": "",        "Utilities": "",        "Status": "", "LDP":"", "Title": "Ettrick Landing"},
         {"Planning": "21CP0076", "EE": "",        "Utilities": "",        "Status": "", "LDP":"", "Title": "Copper Grove 3"},
         {"Planning": "21CP0084", "EE": "",        "Utilities": "",        "Status": "", "LDP":"", "Title": "Lake Margaret 3"},
         {"Planning": "18PR0128", "EE": "2018027",	"LDP": "301066", "Status": "", "Utilities": "17-0197", "Title": "Glen and colonial heights"},		
         {"Planning": "18PR0201", "EE": "2018103",	"LDP": "301176", "Status": "", "Utilities": "18-0054", "Title": "Festival Park Retail 2018"},		
         {"Planning": "18PR0243", "EE": "2018144",	"LDP": "301172", "Status": "", "Utilities": "18-0131", "Title": "A&A Paving Ph III Grading Plan"},		
         {"Planning": "19PR0135", "EE": "2019040",	"LDP": "301257", "Status": "", "Utilities": "17-0231", "Title": "Boulders Lake Apartments"},		
         {"Planning": "19PR0154", "EE": "2019062",	"LDP": "301255", "Status": "", "Utilities": "19-0003", "Title": "J R Minter"},
         {"Planning": "19PR0170", "EE": "2019089",	"LDP": "301302", "Status": "", "Utilities": "", "Title": "Wescott Condos Phase 1"},		
         {"Planning": "19PR0181", "EE": "2019101",	"LDP": "301409", "Status": "", "Utilities": "", "Title": "Chester ECC-911 Telecom Facility"},		
         {"Planning": "19PR0184", "EE": "2019103",	"LDP": "301416", "Status": "", "Utilities": "", "Title": "Matoaca ECC-199 Telecom Facility"},		
         {"Planning": "20PR0128", "EE": "2020020", "Utilities": "", "Status": "", "LDP": "", "Title": "Rivers Bend East parking lot expansion"},		
         {"Planning": "20PR0164", "EE": "2020042", "Utilities": "", "Status": "", "LDP": "", "Title": "Beulah Recreation Center"},
         {"Planning": "21PR0001", "EE": "", "Utilities": "", "Status": "Sub4", "LDP": "", "Title": "Courthouse Landing Infrastructure"},	
         {"Planning": "21PR0103", "EE": "2021003", "Utilities": "", "Status": "", "LDP": "", "Title": "Woolridge Landing Recreation Center"},	
         {"Planning": "21PR0133", "EE": "",	"Utilities": "", "Status": "", "LDP":"", "Title": "Cosby Village Townhomes Dog Park"},
         {"Planning": "21PR0160", "EE": "2021064", "Utilities": "", "Status": "", "LDP": "", "Title": "Lambert Landing Phase 1"},
         {"Planning": "21PR0260", "EE": "",	"Utilities": "", "Status": "", "LDP":"", "Title": "Gateway Apartments"},
         {"Planning": "21PR0265", "EE": "",	"Utilities": "", "Status": "", "LDP":"", "Title": "Chapel at old hundred"},
         {"Planning": "21PR0271", "EE": "",	"Utilities": "", "Status": "", "LDP":"", "Title": "Kiddie Academy"},
         {"Planning": "21PR0278", "EE": "",	"Utilities": "", "Status": "", "LDP":"LDP21-0175", "Title": "Twin Rivers SWM Pond"},		
         {"Planning": "", "EE": "2017085", "Utilities": "", "Status": "", "LDP": "300938", "Title":	"The Townes at Notting Place"},	
         {"Planning": "", "EE": "2017127", "Utilities": "17-0089", "Status": "", "LDP": "301097", "Title": "Magnolia Green Phase 3 Sanitory Sewer Extension"},
         {"Planning": "", "EE": "2018044", "Utilities": "", "Status": "", "LDP": "301329", "Title":	"Cowan Road Waterline"},
         {"Planning": "", "EE": "2008080", "Utilities": "", "Status": "", "LDP": "300920", "Title": "Charter Colony Tract 3 Natural Trail"},
         {"Planning": "", "EE": "2018136", "Utilities": "", "Status": "", "LDP": "301236", "Title":	"Hancock Village Sediment Basin and Stabilization"},	
         {"Planning": "", "EE": "2019157", "Utilities": "", "Status": "Approve", "LDP": "LDP21-0016", "Title": "Harper's Mill Subdivision Southeast Phase Trunk Sewer"},
         {"Planning": "", "EE": "2019158", "Utilities": "", "Status": "Approve", "LDP": "LDP21-0026", "Title": "Dry Creek BMP"},				
         {"Planning": "", "EE": "2020057", "Utilities": "", "Status": "Approve", "LDP": "LDP21-0026", "Title": "Cloverleaf Lake Apartments Pond Improvements"},
         {"Planning": "", "EE": "2021025", "Utilities": "", "Status": "Approve", "LDP": "301470", "Title": "Summer Lake Parking Lot"},
         {"Planning": "", "EE": "2020105", "Utilities": "", "Status": "Approve", "LDP": "LDP21-0125", "Title": "Tomahawk Creek Trunk Sewer Phase 3"},
         {"Planning": "", "EE": "2020135", "Utilities": "",	"Status": "Approve", "LDP": "LDP21-0127", "Title": "Michaux Creek Stabilization and Improvements"}
    ];

    for (let i = 0; i < projs.length; i++) {
        $("#projTable tbody").append(
            '<tr>' +
            '<th>' + (i+1).toString() + '</th>' + 
            '<td>' + projs[i].Planning + '</td>' + 
            '<td>' + projs[i].EE + '</td>' + 
            '<td>' + projs[i].Utilities + '</td>' + 
            '<td>' + projs[i].LDP + '</td>' + 
            "<td style='text-align:left'>" + projs[i].Title + '</td>' + 
            '<td>' + projs[i].Status + '</td>' + 
            '</tr>');
    };
});