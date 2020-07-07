namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EditedSharer4 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Sharers", "Id", "dbo.AspNetUsers");
            DropIndex("dbo.Sharers", new[] { "Id" });
        }
        
        public override void Down()
        {
            CreateIndex("dbo.Sharers", "Id");
            AddForeignKey("dbo.Sharers", "Id", "dbo.AspNetUsers", "Id");
        }
    }
}
