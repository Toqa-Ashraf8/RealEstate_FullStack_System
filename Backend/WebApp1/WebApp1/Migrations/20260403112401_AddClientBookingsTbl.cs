using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp1.Migrations
{
    /// <inheritdoc />
    public partial class AddClientBookingsTbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Installments_ClientBookingDetails_ClientBookingDetailBookingID",
                table: "Installments");

            migrationBuilder.DropColumn(
                name: "BookingDate",
                table: "ClientBookingDetails");

            migrationBuilder.DropColumn(
                name: "CheckImagePath",
                table: "ClientBookingDetails");

            migrationBuilder.DropColumn(
                name: "DownPayment",
                table: "ClientBookingDetails");

            migrationBuilder.DropColumn(
                name: "FirstInstallmentDate",
                table: "ClientBookingDetails");

            migrationBuilder.DropColumn(
                name: "InstallmentYears",
                table: "ClientBookingDetails");

            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "ClientBookingDetails");

            migrationBuilder.DropColumn(
                name: "ProjectCode",
                table: "ClientBookingDetails");

            migrationBuilder.DropColumn(
                name: "ReservationAmount",
                table: "ClientBookingDetails");

            migrationBuilder.DropColumn(
                name: "Reserved",
                table: "ClientBookingDetails");

            migrationBuilder.DropColumn(
                name: "UnitID",
                table: "ClientBookingDetails");

            migrationBuilder.RenameColumn(
                name: "ClientBookingDetailBookingID",
                table: "Installments",
                newName: "ClientBookingDetailCode");

            migrationBuilder.RenameIndex(
                name: "IX_Installments_ClientBookingDetailBookingID",
                table: "Installments",
                newName: "IX_Installments_ClientBookingDetailCode");

            migrationBuilder.RenameColumn(
                name: "BookingID",
                table: "ClientBookingDetails",
                newName: "Code");

            migrationBuilder.CreateTable(
                name: "ClientBookings",
                columns: table => new
                {
                    BookingID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReservationAmount = table.Column<int>(type: "int", nullable: true),
                    PaymentMethod = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CheckImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DownPayment = table.Column<int>(type: "int", nullable: true),
                    FirstInstallmentDate = table.Column<int>(type: "int", nullable: true),
                    InstallmentYears = table.Column<int>(type: "int", nullable: true),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ClientID = table.Column<int>(type: "int", nullable: false),
                    ProjectCode = table.Column<int>(type: "int", nullable: true),
                    UnitID = table.Column<int>(type: "int", nullable: true),
                    Reserved = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientBookings", x => x.BookingID);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Installments_ClientBookingDetails_ClientBookingDetailCode",
                table: "Installments",
                column: "ClientBookingDetailCode",
                principalTable: "ClientBookingDetails",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Installments_ClientBookingDetails_ClientBookingDetailCode",
                table: "Installments");

            migrationBuilder.DropTable(
                name: "ClientBookings");

            migrationBuilder.RenameColumn(
                name: "ClientBookingDetailCode",
                table: "Installments",
                newName: "ClientBookingDetailBookingID");

            migrationBuilder.RenameIndex(
                name: "IX_Installments_ClientBookingDetailCode",
                table: "Installments",
                newName: "IX_Installments_ClientBookingDetailBookingID");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "ClientBookingDetails",
                newName: "BookingID");

            migrationBuilder.AddColumn<DateTime>(
                name: "BookingDate",
                table: "ClientBookingDetails",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheckImagePath",
                table: "ClientBookingDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DownPayment",
                table: "ClientBookingDetails",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FirstInstallmentDate",
                table: "ClientBookingDetails",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InstallmentYears",
                table: "ClientBookingDetails",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentMethod",
                table: "ClientBookingDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProjectCode",
                table: "ClientBookingDetails",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReservationAmount",
                table: "ClientBookingDetails",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Reserved",
                table: "ClientBookingDetails",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UnitID",
                table: "ClientBookingDetails",
                type: "int",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Installments_ClientBookingDetails_ClientBookingDetailBookingID",
                table: "Installments",
                column: "ClientBookingDetailBookingID",
                principalTable: "ClientBookingDetails",
                principalColumn: "BookingID");
        }
    }
}
