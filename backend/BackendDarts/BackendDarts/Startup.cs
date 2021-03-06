using BackendDarts.data;
using BackendDarts.Models;
using BackendDarts.Repos;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using BackendDarts.data.Repos;
using BackendDarts.data.Repos.IRepos;
using Microsoft.AspNetCore.Http;
using BackendDarts.Domain;
using BackendDarts.Data.Repos.IRepos;
using BackendDarts.Data.Repos;
using Newtonsoft.Json;
using BackendDarts.Hubs;

namespace BackendDarts
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.AddSignalR();
            var connection = @"Server=(localdb)\mssqllocaldb;Database=BackendDarts;Trusted_Connection=True;ConnectRetryCount=0";
            services.AddDbContext<ApplicationDbContext>
                (options => options.UseSqlServer(connection, b => b.MigrationsAssembly("BackendDarts")));
            services.AddScoped<DataInitializer>();
            services.AddScoped<IGameRepository, GameRepository>();
            services.AddScoped<IPlayerRepository, PlayerRepository>();
            services.AddScoped<IPlayerLegRepository, PlayerLegRepository>();
            services.AddScoped<ITournamentRepository, TournamentRepository>();
            services.AddScoped<IPiLinkRepository, PiLinkRepository>();

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            services.AddScoped<IGameRepository, GameRepository>();


            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.AddCors(options => options.AddPolicy("AllowAllOrigins", builder => builder.AllowAnyOrigin()));
            services.AddCors(o => o.AddPolicy("CorsPolicy", builder => {
                builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins("http://localhost:3000");
            }));
            services.AddOpenApiDocument();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataInitializer dataInitializer)
        {
            app.UseCors("CorsPolicy");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotifyHub>("/notify");
            });

            /*
            app.UseSignalR(routes =>
            {
                routes.MapHub<ChangeHub>("/ChangeHub");
            })
            */
            app.UseSwaggerUi3(); app.UseOpenApi();


            app.UseAuthorization();


            dataInitializer.InitializeData().Wait();
        }
    }
}
