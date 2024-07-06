import reportsQueries from "../queries/reports.queries";

class ReportsService{


    dailybookReport(){
        return new Promise(async (resolve, reject) => {
            try {
              const Brands = await reportsQueries.createDailybookReport();
      
              return resolve(Brands);
            } catch (err) {
              reject({ message: `Failed to List Brands: ${err}` });
            }
          });
    }
}



export default new ReportsService()