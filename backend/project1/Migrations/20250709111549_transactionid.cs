using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project1.Migrations
{
    /// <inheritdoc />
    public partial class transactionid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TransactionUuid",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TransactionUuid",
                table: "Orders");
        }
    }
}
