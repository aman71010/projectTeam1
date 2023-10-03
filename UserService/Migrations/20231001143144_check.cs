using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserService.Migrations
{
    public partial class check : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAddresses_Users_UserEmailId",
                table: "UserAddresses");

            migrationBuilder.DropIndex(
                name: "IX_UserAddresses_UserEmailId",
                table: "UserAddresses");

            migrationBuilder.AddColumn<long>(
                name: "AddressId",
                table: "Users",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserEmailId",
                table: "UserAddresses",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AddressId",
                table: "Users",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_UserAddresses_AddressId",
                table: "Users",
                column: "AddressId",
                principalTable: "UserAddresses",
                principalColumn: "AddressId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_UserAddresses_AddressId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_AddressId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "UserEmailId",
                table: "UserAddresses",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_UserAddresses_UserEmailId",
                table: "UserAddresses",
                column: "UserEmailId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAddresses_Users_UserEmailId",
                table: "UserAddresses",
                column: "UserEmailId",
                principalTable: "Users",
                principalColumn: "UserEmailId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
