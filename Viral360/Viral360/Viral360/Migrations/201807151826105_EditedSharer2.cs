namespace Uprise.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EditedSharer2 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Sharers", new[] { "UserId_Id" });
            DropForeignKey("dbo.Sharers", "FK_dbo.Sharers_dbo.AspNetUsers_UserId_Id");
            DropColumn("dbo.Sharers", "UserId_Id");
            AlterColumn("dbo.Sharers", "Id", c => c.Int(nullable: false));
            CreateIndex("dbo.Sharers", "Id");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.Sharers");
            AlterColumn("dbo.Sharers", "Id", c => c.Int());
            AlterColumn("dbo.Sharers", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Sharers", "Id");
            RenameColumn(table: "dbo.Sharers", name: "Id", newName: "UserId_Id");
            AddColumn("dbo.Sharers", "Id", c => c.Int(nullable: false, identity: true));
            CreateIndex("dbo.Sharers", "UserId_Id");
        }
    }
}
