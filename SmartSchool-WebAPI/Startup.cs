using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SmartSchool_WebAPI.Data;

namespace SmartSchool_WebAPI
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(
                x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection"))
            );

            //Toda vez que for instanciada uma Controller qu recebe um IRepository como parâmetro, o EntityFramework passa o Repository
            //para essa controller
            services.AddControllers()
                    .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = 
                    Newtonsoft.Json.ReferenceLoopHandling.Ignore); //esse segundo Add é para ignorar o loop infinito que aparece pq
                    //um aluno tem várias disciplinas e cada uma das várias disciplinas tem um aluno que tem várias disciplinas...
                    //Isso é necessário sempre que se tem uma relação N:N

            //Organização do Aceso ao BD
            //Cria uma camada de acesso ao Banco de Dados, Abstração feita por meio da interface
            services.AddScoped<IRepository, Repository>(); //injecao de dependencia
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            //app.UseAuthorization();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
