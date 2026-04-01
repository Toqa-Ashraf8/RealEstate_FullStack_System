using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp1.Migrations
{
    /// <inheritdoc />
    public partial class RemoveunitName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectName",
                table: "Negotiations");

            migrationBuilder.DropColumn(
                name: "unitName",
                table: "Negotiations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProjectName",
                table: "Negotiations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "unitName",
                table: "Negotiations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
