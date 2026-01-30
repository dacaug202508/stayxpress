
using Microsoft.EntityFrameworkCore;
using UserAndBookingService.Models;
using UserAndBookingService.Repository;
using UserAndBookingService.Services;


namespace UserAndBookingService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<HotelbookingContext>(
                options => options.UseMySql(
                        builder.Configuration.GetConnectionString("dbconnection"),
                        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("dbconnection"))
                    )
                );

            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IOwnerRequestRepository, OwnerRequestRepository>();
            builder.Services.AddScoped<IHotelRepository, HotelRepository>();


            builder.Services.AddScoped<IBookingRepository, BookingRepository>();
            builder.Services.AddScoped<IBookingService, BookingService>();

            builder.Services.AddScoped<IAdminUserService, AdminUserService>();
            builder.Services.AddScoped<IAdminOwnerRequestService, AdminOwnerRequestService>();
            builder.Services.AddScoped<IAdminHotelService, AdminHotelService>();

            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IOwnerRequestService, OwnerRequestService>();


            builder.Services.AddControllers()
    .AddJsonOptions(opt =>
        opt.JsonSerializerOptions.ReferenceHandler =
            System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);
           
            
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy =>
                    {
                        policy.WithOrigins(
                                "http://localhost:3000",   // React (CRA)
                                "http://localhost:5173"    // React (Vite)
                            )
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });




            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();


            app.UseCors("AllowFrontend");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
