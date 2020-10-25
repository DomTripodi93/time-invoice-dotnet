using System.Data;
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
        public void ExecuteProcedure(string sql)
        {
            using (IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                dbConnection.Execute(sql);
            }
        }
    }
}
