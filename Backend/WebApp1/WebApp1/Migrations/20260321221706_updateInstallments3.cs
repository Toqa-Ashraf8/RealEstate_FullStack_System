using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp1.Migrations
{
    /// <inheritdoc />
    public partial class updateInstallments3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DownPayment",
                table: "Installments");

            migrationBuilder.DropColumn(
                name: "EachMonthPrice",
                table: "Installments");

            migrationBuilder.DropColumn(
                name: "InstallmentStatus",
                table: "Installments");

            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "Installments",
                newName: "Months");

            migrationBuilder.RenameColumn(
                name: "MonthsCount",
                table: "Installments",
                newName: "MonthlyAmount");

            migrationBuilder.RenameColumn(
                name: "InstallmentYears",
                table: "Installments",
                newName: "InstallmentNumber");

            migrationBuilder.RenameColumn(
                name: "InstallmentDate",
                table: "Installments",
                newName: "DueDate");

            migrationBuilder.AddColumn<bool>(
                name: "Paid",
                table: "Installments",
                type: "bit",
                nullable: true,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "DownPayment",
                table: "ClientBookingDetails",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "FirstInstallmentDate",
                table: "ClientBookingDetails",
                type: "datetime2",
                nullable: true,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "InstallmentYears",
                table: "ClientBookingDetails",
                type: "int",
                nullable: true,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Paid",
                table: "Installments");

            migrationBuilder.DropColumn(
                name: "DownPayment",
                table: "ClientBookingDetails");

            migrationBuilder.DropColumn(
                name: "FirstInstallmentDate",
                table: "ClientBookingDetails");

            migrationBuilder.DropColumn(
                name: "InstallmentYears",
                table: "ClientBookingDetails");

            migrationBuilder.RenameColumn(
                name: "Months",
                table: "Installments",
                newName: "TotalPrice");

            migrationBuilder.RenameColumn(
                name: "MonthlyAmount",
                table: "Installments",
                newName: "MonthsCount");

            migrationBuilder.RenameColumn(
                name: "InstallmentNumber",
                table: "Installments",
                newName: "InstallmentYears");

            migrationBuilder.RenameColumn(
                name: "DueDate",
                table: "Installments",
                newName: "InstallmentDate");

            migrationBuilder.AddColumn<int>(
                name: "DownPayment",
                table: "Installments",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EachMonthPrice",
                table: "Installments",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InstallmentStatus",
                table: "Installments",
                type: "int",
                nullable: true,
                defaultValue: 0);
        }
    }
}
