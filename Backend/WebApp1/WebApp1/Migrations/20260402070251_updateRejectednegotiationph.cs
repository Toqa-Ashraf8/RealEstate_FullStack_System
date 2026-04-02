using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp1.Migrations
{
    /// <inheritdoc />
    public partial class updateRejectednegotiationph : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientName",
                table: "Rejected_negotiations_phases");

            migrationBuilder.DropColumn(
                name: "ProjectName",
                table: "Rejected_negotiations_phases");

            migrationBuilder.DropColumn(
                name: "Unit",
                table: "Rejected_negotiations_phases");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientName",
                table: "Rejected_negotiations_phases",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectName",
                table: "Rejected_negotiations_phases",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "Rejected_negotiations_phases",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
