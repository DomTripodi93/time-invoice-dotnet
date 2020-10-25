using System.Data;
using System.Threading.Tasks;
using System.Linq;
using backend.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace backend.Data
{
    public class SqlAccess
    {
        private readonly IConfiguration _config;
        public SqlAccess(IConfiguration config)
        {
            _config = config;
        }
        public async Task<T> ExecuteProcedure<T>(string sql)
        {
            using (IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<T>(sql);
            }
        }
    }
}
